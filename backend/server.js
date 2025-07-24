const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const multer = require("multer");
const twilio = require("twilio");
const User = require("./models/User");
const Booking = require("./models/Booking");
const Review = require("./models/Review");
const Trek = require("./models/Trek");
const adminRoutes = require("./routes/adminRoutes");
const supabase = require("./supabaseClient");
require("dotenv").config();

const app = express();

// Twilio configuration
// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// Middleware
app.use(cors());
app.use(express.json());

// Store verification codes temporarily (in production, use Redis or similar)
const verificationCodes = new Map();

// Generate random 6-digit code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification code endpoint
app.post("/api/verify/send", async (req, res) => {
  try {
    // const { mobileNumber } = req.body;
    // if (!mobileNumber) {
    //   return res.status(400).json({ message: "Mobile number is required" });
    // }
    // const code = generateVerificationCode();
    // verificationCodes.set(mobileNumber, {
    //   code,
    //   expires: Date.now() + 5 * 60 * 1000,
    // });
    // await twilioClient.messages.create({
    //   body: `Your verification code for HikeOn booking is: ${code}`,
    //   to: mobileNumber,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    // });
    res.json({ message: "Verification code sent successfully (mocked)" });
  } catch (error) {
    console.error("Error sending verification code:", error);
    res.status(500).json({
      message: "Failed to send verification code",
      error: error.message,
    });
  }
});

// Verify code endpoint
app.post("/api/verify/check", (req, res) => {
  try {
    const { mobileNumber, code } = req.body;

    if (!mobileNumber || !code) {
      return res.status(400).json({ message: "Mobile number and code are required" });
    }

    const storedData = verificationCodes.get(mobileNumber);

    if (!storedData) {
      return res.status(400).json({ message: "No verification code found" });
    }

    if (Date.now() > storedData.expires) {
      verificationCodes.delete(mobileNumber);
      return res.status(400).json({ message: "Verification code expired" });
    }

    if (storedData.code !== code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // Clean up the used code
    verificationCodes.delete(mobileNumber);

    res.json({ message: "Verification successful" });
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).json({
      message: "Failed to verify code",
      error: error.message,
    });
  }
});

// Connect to MongoDB Atlas
// mongoose
//   .connect(
//     "mongodb+srv://champ040cp:3cZJAMK4gadMsRoE@hikeon.vbxq7.mongodb.net/?retryWrites=true&w=majority&appName=HikeOn",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("Connected to MongoDB Atlas"))
//   .catch((err) => console.error("Could not connect to MongoDB Atlas", err));

// JWT Secret
const JWT_SECRET = "your_jwt_secret"; // In production, use an environment variable

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Supabase Auth Registration
app.post('/api/register', async (req, res) => {
  const { email, password, name, role, phone, location, nearestTrek } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });
  const { user } = data;
  if (!user || !user.id) {
    return res.status(400).json({ error: "User creation failed. Please check if the email is already registered or confirm your email." });
  }
  if (role === 'vendor') {
    await supabase.from('Vendor').insert([{ id: user.id, name, email, phone, location, nearest_trek: nearestTrek, status: 'pending' }]);
  } else if (role === 'user') {
    await supabase.from('UserProfile').insert([{ id: user.id, name }]);
  }
  res.json({ message: 'Registration successful. Please verify your email.' });
});

// Supabase Auth Login
app.post('/api/login', async (req, res) => {
  const { email, password, role } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return res.status(400).json({ error: error.message });

  const user = data.user;
  if (!user || !user.id) {
    return res.status(400).json({ error: "User not found." });
  }

  // If vendor, check Vendor.status
  if (role === 'vendor') {
    const { data: vendorData } = await supabase.from('Vendor').select('status').eq('id', user.id).single();
    if (!vendorData || vendorData.status !== 'approved') {
      return res.status(403).json({ error: 'Vendor account pending approval by admin.' });
    }
  }

  // Check if UserProfile exists
  const { data: existingProfile } = await supabase
    .from('UserProfile')
    .select('id')
    .eq('id', user.id)
    .single();

  if (!existingProfile) {
    // Create UserProfile on first login
    let userRole = 'user';
    if (role === 'vendor') userRole = 'pending_vendor';
    await supabase
      .from('UserProfile')
      .insert([{ id: user.id, name: user.user_metadata?.name || '', role: userRole }]);
  }

  // Return session and user info
  res.json({ session: data.session, user: data.user });
});

// Middleware: Verify Supabase JWT and get user role
const verifySupabaseToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  console.log('Received token:', token);
  if (!token) return res.status(401).json({ message: 'No token provided' });

  const { data: { user }, error } = await supabase.auth.getUser(token);
  console.log('Decoded user:', user);
  if (error || !user) return res.status(401).json({ message: 'Invalid token' });

  // Attach user to request
  req.user = user;

  // Fetch user profile and role
  const { data: profile, error: profileError } = await supabase
    .from('UserProfile')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profileError) return res.status(401).json({ message: 'Profile not found' });

  req.user.role = profile.role;
  next();
};

// Example: Protect route by role
app.get('/api/admin/data', verifySupabaseToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  res.json({ message: 'Admin data' });
});

// Routes
app.use("/api/admin", adminRoutes);

app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, userId: user._id, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Update user profile route
app.put("/api/user/profile", verifyToken, upload.single("identityProof"), async (req, res) => {
  try {
    const { emergencyContact } = req.body;
    const userId = req.user.userId;

    const updateData = {
      emergencyContact: JSON.parse(emergencyContact),
    };

    if (req.file) {
      updateData.identityProof = {
        filename: req.file.originalname,
        path: req.file.path,
        uploadDate: new Date(),
      };
    }

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Error updating user profile" });
  }
});

// Get user profile (supports both UserProfile and Vendor)
app.get('/api/user', verifySupabaseToken, async (req, res) => {
  // Try UserProfile first
  let { data, error } = await supabase
    .from('Vendor')
    .select('*')
    .eq('id', req.user.id)
    .single();

  console.log("data", data);
  res.json(data);
});


// Add to server.js
app.get("/api/recommendations", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Get user's booked treks
    const bookings = await Booking.find({ userId }).populate("trekId");
    const bookedTreks = bookings.map(b => b.trekId);

    if (bookedTreks.length === 0) {
      const general = await Trek.find().sort({ rating: -1 }).limit(6);
      return res.json(general);
    }

    // Get all treks excluding booked ones
    const allTreks = await Trek.find({ _id: { $nin: bookedTreks.map(t => t._id) } });

    // Calculate similarity scores
    const recommendations = allTreks.map(trek => {
      const score = calculateSimilarity(bookedTreks, trek);
      return { ...trek._doc, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: "Recommendation error" });
  }
});

function calculateSimilarity(bookedTreks, targetTrek) {
  // Simple weighted similarity calculation
  const weights = { difficulty: 0.4, duration: 0.3, price: 0.3 };
  
  const diffs = bookedTreks.map(bt => {
    const diffScore = bt.difficulty === targetTrek.difficulty ? 1 : 0;
    const durScore = 1 - Math.abs(bt.duration - targetTrek.duration) / 24;
    const priceScore = 1 - Math.abs(bt.price - targetTrek.price) / 1000;
    
    return (weights.difficulty * diffScore) + 
           (weights.duration * durScore) + 
           (weights.price * priceScore);
  });

  return diffs.reduce((a, b) => a + b, 0) / diffs.length;
}




// Modified booking route to send confirmation SMS
app.post("/api/book", verifyToken, async (req, res) => {
  try {
    const { trekId, date, numberOfPersons, persons, paymentId, mobileNumber } = req.body;
    const userId = req.user.userId;

    const booking = new Booking({
      userId,
      trekId,
      date,
      numberOfPersons,
      persons,
      paymentId,
      mobileNumber,
      paymentMethod: "Mock Card Payment", // Add payment method type
      paymentStatus: "completed",
    });

    await booking.save();

    // Send confirmation SMS
    // await twilioClient.messages.create({
    //   body: `Your booking for trek on ${new Date(date).toLocaleDateString()} has been confirmed! Booking ID: ${booking._id}`,
    //   to: mobileNumber,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    // });

    res.status(201).json({
      message: "Booking successful",
      bookingId: booking._id,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Error creating booking" });
  }
});

// Get user bookings route
app.get("/api/user/bookings", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId }).sort({ date: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});




app.post("/api/reviews", verifyToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const userId = req.user.userId;

    const review = new Review({
      userId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({
      message: "Review submitted successfully",
      reviewId: review._id,
    });
  } catch (error) {
    console.error("Review submission error:", error);
    res.status(500).json({ message: "Error submitting review" });
  }
});

app.get("/api/reviews", async (req, res) => {
  const { data, error } = await supabase
    .from('Review')
    .select('*')
    .order('createdAt', { ascending: false })
    .limit(10);
  if (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ message: "Error fetching reviews" });
  }
  res.json(data);
});


// Add this to server.js
app.delete("/api/user/bookings/:id", verifyToken, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.userId;

    // Verify that the booking belongs to the user
    const booking = await Booking.findOne({ _id: bookingId, userId });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the booking is in the past
    if (new Date(booking.date) < new Date()) {
      return res.status(400).json({ message: "Cannot delete past bookings" });
    }

    await Booking.deleteOne({ _id: bookingId });
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Error deleting booking" });
  }
});

app.post("/api/logout", verifyToken, (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// List all pending vendors (admin only)
app.get('/api/admin/pending-vendors', verifySupabaseToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  const { data, error } = await supabase
    .from('UserProfile')
    .select('id, name, role')
    .eq('role', 'pending_vendor');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Approve a pending vendor (admin only)
app.post('/api/admin/approve-vendor/:id', verifySupabaseToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  const vendorId = req.params.id;
  const { error } = await supabase
    .from('UserProfile')
    .update({ role: 'vendor' })
    .eq('id', vendorId);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Vendor approved successfully.' });
});

// Add homestay (vendor only)
app.post('/api/homestays', verifySupabaseToken, async (req, res) => {
  // Check vendor status in Vendor table
  const { data: vendorData } = await supabase.from('Vendor').select('status').eq('id', req.user.id).single();
  if (!vendorData || vendorData.status !== 'approved') {
    return res.status(403).json({ error: 'Only approved vendors can add homestays.' });
  }
  const { name, location } = req.body;
  const { data, error } = await supabase
    .from('Homestay')
    .insert([{ vendor_id: req.user.id, name, location }])
    .select()
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Get user profile (robust, logs and returns all fields)
app.get('/api/user/profile', verifySupabaseToken, async (req, res) => {
  // Try Vendor first
  let { data: vendor, error: vendorError } = await supabase
    .from('Vendor')
    .select('*')
    .eq('id', req.user.id)
    .single();
  if (vendor) {
    console.log('Vendor profile:', vendor);
    return res.json(vendor);
  }
  // Otherwise, try UserProfile
  let { data: userProfile, error: userError } = await supabase
    .from('UserProfile')
    .select('*')
    .eq('id', req.user.id)
    .single();
  if (userProfile) {
    console.log('User profile:', userProfile);
    return res.json(userProfile);
  }
  res.status(404).json({ error: 'Profile not found' });
});

// Update user profile (supports both Vendor and UserProfile)
app.put('/api/user/profile', verifySupabaseToken, async (req, res) => {
  const { name, email, phone, location, nearest_trek } = req.body;
  // Try updating Vendor first
  let { data: vendor, error: vendorError } = await supabase
    .from('Vendor')
    .select('id')
    .eq('id', req.user.id)
    .single();
  if (vendor) {
    const { error } = await supabase
      .from('Vendor')
      .update({ name, email, phone, location, nearest_trek })
      .eq('id', req.user.id);
    if (error) return res.status(400).json({ error: error.message });
    return res.json({ message: 'Profile updated' });
  }
  // Otherwise, update UserProfile
  const { error } = await supabase
    .from('UserProfile')
    .update({ name, email, phone })
    .eq('id', req.user.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: 'Profile updated' });
});

// Get vendor status
app.get('/api/vendor/status', verifySupabaseToken, async (req, res) => {
  const { data, error } = await supabase.from('Vendor').select('*').eq('id', req.user.id).single();
  console.log('Vendor status fetch:', { id: req.user.id, data, error });
  if (error || !data) return res.status(404).json({ error: 'Vendor not found' });
  res.json({ status: data.status ? data.status.toLowerCase() : '' });
});

// Get all treks
app.get('/api/treks', async (req, res) => {
  const { data, error } = await supabase.from('Trek').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Get all homestays, support vendor_id filter
app.get('/api/homestays', async (req, res) => {
  const { vendor_id } = req.query;
  let query = supabase.from('Homestay').select('*');
  if (vendor_id) query = query.eq('vendor_id', vendor_id);
  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Get all bookings, support vendor_id filter
app.get('/api/bookings', async (req, res) => {
  const { vendor_id } = req.query;
  if (vendor_id) {
    // Get all homestays for this vendor
    const { data: homestays, error: hsError } = await supabase.from('Homestay').select('id').eq('vendor_id', vendor_id);
    if (hsError) return res.status(500).json({ error: hsError.message });
    const homestayIds = (homestays || []).map(h => h.id);
    if (homestayIds.length === 0) return res.json([]);
    // Get all bookings for these homestays
    const { data, error } = await supabase.from('Booking').select('*').in('homestay_id', homestayIds);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
    return;
  }
  // Default: return all bookings
  const { data, error } = await supabase.from('Booking').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

const port = 5000;  // Use Render's assigned port
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

