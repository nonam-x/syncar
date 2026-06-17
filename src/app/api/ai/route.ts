import { geminiModel } from "@/lib/gemini";
import {cleanAIResponse} from "@/utils/cleanResponse";
// export async function POST(req: Request) {
//   const { prompt } = await req.json();  

//     const result = await geminiModel.generateContent(prompt);

//     const response = result.response.text();

//     return Response.json({ response });
// }

export async function GET(){
const result = await geminiModel.generateContent("what is bundelkhandi"
);

const clean = cleanAIResponse(result.response.text())
return Response.json({ response: clean });
     

  
} 


