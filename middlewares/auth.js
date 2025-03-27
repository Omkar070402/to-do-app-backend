const authMiddleware = (req, res, next) => {
    console.log("🔍 Incoming Request Headers:", req.headers); // Debugging line

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("❌ No token provided or incorrect format");
        return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }

    const token = authHeader.split(" ")[1];
    console.log("✅ Extracted Token:", token); // Debugging line

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("✅ Token Verified, User ID:", decoded.userId); // Debugging line
        next();
    } catch (error) {
        console.log("❌ Token verification failed:", error.message);
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};

export default authMiddleware;
