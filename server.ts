import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON bodies
app.use(express.json());

// Initialize Gemini Client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined. AI Consultant will operate in mock mode.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

const aiClient = getGeminiClient();

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Secular Gold & Black Design Consultant API endpoint
app.post("/api/ai/consult", async (req, res) => {
  try {
    const { roomType, primaryMood, roomDescription, approxBudget } = req.body;

    if (!roomType || !primaryMood || !roomDescription) {
      return res.status(400).json({ error: "Missing required consulting parameters (roomType, primaryMood, roomDescription)." });
    }

    if (!aiClient) {
      // Graceful fallback mock responses if API is missing or keys are not yet bound
      return res.json({
        advice: `### Mock Consultation: Personalized modern design layout overview\n\nSince local credentials are initialization-guarded, we've loaded a premium architectural template:\n- **Space Partitioning**: Center your **${roomType}** around a focal seating arrangement featuring customized matte black velvet or high-end ebonized wood framing.\n- **Sensory Accents**: Contrast a deep fluted charcoal wall cladding with elegant, hanging drapes in **${primaryMood === 'Minimalist Choice' ? 'Subtle Champagne Gold' : 'Imperial Metallic Gold'}**.\n- **Lighting Blueprint**: Install linear warm white/golden cove LED illumination throwing 2400K direct glow lines along horizontal registers to offset ebonized oak finishes beautifully.`,
        colorPalette: [
          { name: "Obsidian Base", hex: "#0a0a0c", description: "Vantablack-adjacent base styling for maximum depth" },
          { name: "Sovereign Gold", hex: "#d4af37", description: "Shimmering classic gold accents on custom trims & handles" },
          { name: "Graphite Charcoal", hex: "#27272a", description: "Soot grey transitions across textured slate walls" },
          { name: "Champagne Leaf", hex: "#f1d182", description: "Understated soft gold for backlights, pillows and textiles" }
        ],
        shoppingList: [
          { item: "Custom Ebonized Oak Desk or Sofa Frame", estimatedCost: "3,800", priority: "High" },
          { item: "Gilded Solid Brass Ceiling Pendant Lamp", estimatedCost: "1,150", priority: "High" },
          { item: "Fluted Charcoal Soundproof Acoustic Wall Slats (Pack of 8)", estimatedCost: "900", priority: "Medium" }
        ],
        suggestedBookingService: approxBudget >= 15000 ? "Signature Sovereign Plan" : "Gilded Consultation"
      });
    }

    const systemInstruction = `You are the lead luxury AI interior designer for "Taj Interior Decor" (an elite high-end interior decorator company). Your expertise is designing exquisite, moody, modern spaces showcasing heavy gold and black palettes (matte obsidian black, deep carbon, slate graphite, paired with liquid brass, warm brushed gold, champagne leaf, polished gold neon, and architectural golden-hour lighting). Your designs are highly sophisticated, warm but bold, and prioritize light-and-shadow layouts. Be helpful, enthusiastic, and talk in premium architectural terms.`;

    const prompt = `Consult on a design for this space:
Room Type: ${roomType}
Aesthetic Vibe: ${primaryMood}
Budget Limit: $${approxBudget || 5000}
Client Description of the room we are planning: "${roomDescription}"

Please provide layout recommendations, fabric details, color swatch suggestions, and shopping elements that pair black and gold masterfully.`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: {
              type: Type.STRING,
              description: "Extremely descriptive step-by-step layout advice, wall treatments, furniture positioning and ambient lighting suggestions formatted in rich clear Markdown. Include bullet points and header titles."
            },
            colorPalette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  hex: { type: Type.STRING, description: "A valid HEX color starting with #" },
                  description: { type: Type.STRING, description: "How this color should be used (e.g. wall, textiles, framing)" }
                },
                required: ["name", "hex", "description"]
              },
              description: "A gorgeous luxury dark thematic palette of 4 colors blending shades of black, gray, and premium shades of gold."
            },
            shoppingList: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING, description: "Name/description of the furniture/fixture element" },
                  estimatedCost: { type: Type.STRING, description: "Price range or estimated cost in USD (just numbers and commas, e.g. 1,200)" },
                  priority: { type: Type.STRING, description: "High, Medium, or Low" }
                },
                required: ["item", "estimatedCost", "priority"]
              },
              description: "Suggested high quality furniture / decor pieces corresponding to their budget and style."
            },
            suggestedBookingService: {
              type: Type.STRING,
              description: "Provide a tailored invitation to book one of Taj's physical services (e.g. 'Gilded Consultation', 'Signature Sovereign Plan', 'Imperial Crown Custom Masterpiece') in light of their project scale."
            }
          },
          required: ["advice", "colorPalette", "shoppingList", "suggestedBookingService"]
        }
      }
    });

    const textOutput = response.text || "{}";
    const dataResponse = JSON.parse(textOutput);
    res.json(dataResponse);

  } catch (error: any) {
    console.error("Gemini server-side consultation failed:", error);
    res.status(500).json({ error: "Sorry, our design engine is updating. Please try again soon." });
  }
});

// Configure Vite middleware or Static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Taj Server] Running perfectly at http://localhost:${PORT}`);
  });
}

startServer();
