
import { storage } from "./storage";
import { templates, apiKeys } from "@shared/schema";
import path from "path";

async function seed() {
  // Check if templates exist
  const existingTemplates = await storage.getTemplates();
  if (existingTemplates.length === 0) {
    console.log("Seeding templates...");
    await storage.createTemplate({
      id: "course-completion",
      name: "Course Completion Certificate",
      orientation: "landscape",
      width: 794,
      height: 1123,
      elements: [
        {
          id: "bg-shape",
          type: "shape",
          x: 0,
          y: 0,
          width: 794,
          height: 1123,
          backgroundColor: "#f9fafb",
          zIndex: 0
        },
        {
          id: "border",
          type: "shape",
          x: 20,
          y: 20,
          width: 754,
          height: 1083,
          borderColor: "#d1d5db",
          borderWidth: 5,
          backgroundColor: "transparent",
          zIndex: 1
        },
        {
          id: "title",
          type: "staticText",
          x: 0,
          y: 100,
          width: 794,
          height: 60,
          text: "Certificate of Completion",
          fontFamily: "Outfit",
          fontSize: 40,
          fontWeight: "bold",
          textAlign: "center",
          color: "#111827",
          zIndex: 2
        },
        {
          id: "subtitle",
          type: "staticText",
          x: 0,
          y: 180,
          width: 794,
          height: 30,
          text: "This certifies that",
          fontFamily: "Inter",
          fontSize: 18,
          textAlign: "center",
          color: "#4b5563",
          zIndex: 2
        },
        {
          id: "recipient-name",
          type: "dynamicText",
          x: 0,
          y: 240,
          width: 794,
          height: 50,
          text: "{{Name}}",
          bindingField: "Name",
          fontFamily: "Outfit",
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          color: "#000000",
          zIndex: 2
        },
        {
          id: "course-text",
          type: "staticText",
          x: 0,
          y: 320,
          width: 794,
          height: 30,
          text: "has successfully completed the course",
          fontFamily: "Inter",
          fontSize: 18,
          textAlign: "center",
          color: "#4b5563",
          zIndex: 2
        },
        {
          id: "course-name",
          type: "dynamicText",
          x: 0,
          y: 360,
          width: 794,
          height: 40,
          text: "{{Course}}",
          bindingField: "Course",
          fontFamily: "Outfit",
          fontSize: 24,
          fontWeight: "600",
          textAlign: "center",
          color: "#000000",
          zIndex: 2
        },
        {
          id: "date",
          type: "dynamicText",
          x: 0,
          y: 500,
          width: 794,
          height: 30,
          text: "{{Date}}",
          bindingField: "Date",
          fontFamily: "Inter",
          fontSize: 16,
          textAlign: "center",
          color: "#6b7280",
          zIndex: 2
        }
      ]
    });
  }

  // Check if API keys exist
  const existingKeys = await storage.getApiKeys();
  if (existingKeys.length === 0) {
    console.log("Seeding API keys...");
    await storage.createApiKey({
      key: "sk_demo_12345",
      ownerName: "Demo User",
      permissions: ["generate", "read_templates"]
    });
  }

  // Check if admin user exists
  const adminUser = await storage.getUserByUsername("admin");
  if (!adminUser) {
    console.log("Seeding admin user...");
    const { hashPassword } = await import("./auth");
    const hashedPassword = await hashPassword("admin"); // Default password
    await storage.createUser({
      username: "admin",
      password: hashedPassword,
      role: "admin"
    });
    console.log("Admin user created (username: admin, password: admin)");
  }
}

export default seed;

if (process.argv[1] && (path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.substring(process.platform === 'win32' ? 1 : 0)))) {
  seed().then(() => {
    console.log("Seeding completed successfully.");
    process.exit(0);
  }).catch(err => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
}

