# Syncar

An AI-powered email and calendar management app built using Next.js, Corsair, and Gemini/OpenAI.

## 🚀 Overview

Syncar is a modern productivity tool that reimagines Gmail and Google Calendar with an AI-first approach. Instead of clicking through multiple screens, users can manage emails and meetings using a clean UI or natural language chat.

## ✨ Features

* 📩 Gmail integration (send, read, search emails)
* 📅 Google Calendar integration (create & manage events)
* 🤖 AI Chat assistant (natural language commands)
* ⚡ Real-time updates using webhooks
* 🔍 Smart email search and filtering
* 🧠 AI-based email prioritization
* ⌨️ Keyboard shortcuts (optional)

## 🧱 Tech Stack

* Next.js (App Router)
* TypeScript
* PostgreSQL + Prisma
* Corsair SDK (Gmail + Calendar integration layer)
* Gemini / OpenAI (AI agent)
* Clerk (authentication)
* Tailwind CSS + shadcn/ui

## 🧠 Core Idea

Instead of building raw Gmail UI again, this app uses Corsair as an integration layer and AI as the control system:

User → UI / Chat → AI (Gemini) → Corsair → Gmail / Calendar → Response

## ⚙️ Setup (Basic)

1. Install dependencies
2. Setup `.env` (Google, Corsair, DB, AI keys)
3. Run Prisma migrations
4. Start Next.js server
5. Expose localhost using ngrok for webhooks

## 📡 Webhooks

Corsair sends real-time updates (new emails, calendar events) directly to backend endpoints using webhook URLs.

## 🎯 Goal

To build a flexible AI-first productivity inbox where users control email and calendar using natural language instead of clicks.

---

Builder Mode On | MacBook Giveaway Hackathon
#chaicode #corsair-dev
