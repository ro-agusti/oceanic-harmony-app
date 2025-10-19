import { User } from "./models/User.js";
import bcrypt from "bcrypt";

(async () => {
  const existingAdmin = await User.findOne({ where: { email: "admin@example.com" } });
  if (!existingAdmin) {
    await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: bcrypt.hashSync("admin123", 10),
      role: "admin",
    });
    console.log("✅ Admin user created automatically");
  } else {
    console.log("✅ Admin already exists");
  }
})();
