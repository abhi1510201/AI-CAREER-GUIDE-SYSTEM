// Multilingual Support
const translations = {
  en: {
    "app-name": "CareerGuide",
    "nav-home": "Home",
    "nav-assessment": "Assessment",
    "nav-about": "About AI",
    "nav-team": "Team",
    "hero-title": "Find Your Future Career Path",
    "hero-subtitle":
      "Empowering students with AI-driven insights aligned with SDG 4 - Quality Education.",
    "hero-btn": "Start Assessment",
    "assess-title": "Smart Career Assessment",
    "label-stream": "Educational Stream",
    "label-interest": "Core Interest",
    "opt-pcm": "PCM (Physics, Chemistry, Math)",
    "opt-pcb": "PCB (Physics, Chemistry, Biology)",
    "opt-comm": "Commerce",
    "opt-arts": "Arts/Humanities",
    "opt-tech": "Technology & Coding",
    "opt-health": "Healthcare & Research",
    "opt-fin": "Finance & Management",
    "opt-create": "Creative Arts & Design",
    "opt-social": "Social Work & Teaching",
    "assess-btn": "Generate My Career Report",
    "about-title": "About the Technology",
    "about-desc":
      "Our system utilizes a Rule-Based AI Engine to match academic backgrounds with market-leading career trajectories.",
    "team-title": "Project Team",
    "school-batch": "Class XII-I | Batch 2026-27",
    "footer-copy": "© 2026 Capstone Project - SDG 4 Quality Education",
    "footer-tag": "Excellence in Education",
  },
  hi: {
    "app-name": "करियर गाइड",
    "nav-home": "होम",
    "nav-assessment": "मूल्यांकन",
    "nav-about": "एआई के बारे में",
    "nav-team": "हमारी टीम",
    "hero-title": "अपना भविष्य का करियर पथ खोजें",
    "hero-subtitle":
      "SDG 4 - गुणवत्तापूर्ण शिक्षा के साथ संरेखित AI-संचालित अंतर्दृष्टि के साथ छात्रों को सशक्त बनाना।",
    "hero-btn": "मूल्यांकन शुरू करें",
    "assess-title": "स्मार्ट करियर मूल्यांकन",
    "label-stream": "शैक्षिक स्ट्रीम",
    "label-interest": "मुख्य रुचि",
    "opt-pcm": "PCM (भौतिकी, रसायन विज्ञान, गणित)",
    "opt-pcb": "PCB (भौतिकी, रसायन विज्ञान, जीव विज्ञान)",
    "opt-comm": "कॉमर्स",
    "opt-arts": "कला/मानविकी",
    "opt-tech": "तकनीक और कोडिंग",
    "opt-health": "स्वास्थ्य सेवा और अनुसंधान",
    "opt-fin": "वित्त और प्रबंधन",
    "opt-create": "रचनात्मक कला और डिजाइन",
    "opt-social": "सामाजिक कार्य और शिक्षण",
    "assess-btn": "मेरी करियर रिपोर्ट तैयार करें",
    "about-title": "तकनीक के बारे में",
    "about-desc":
      "हमारा सिस्टम अकादमिक पृष्ठभूमि को बाजार के अग्रणी करियर पथों के साथ मिलाने के लिए नियम-आधारित एआई इंजन का उपयोग करता है।",
    "team-title": "प्रोजेक्ट टीम",
    "school-batch": "कक्षा XII-I | बैच 2026-27",
    "footer-copy": "© 2026 कैपस्टोन प्रोजेक्ट - SDG 4 गुणवत्तापूर्ण शिक्षा",
    "footer-tag": "शिक्षा में उत्कृष्टता",
  },
};

// Initialize theme and language on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.replace("light-theme", "dark-theme");
    const btn = document.getElementById("themeToggle");
    if (btn) btn.innerText = "☀️";
  }

  const savedLang = localStorage.getItem("lang") || "en";
  const langSelect = document.getElementById("langSelect");
  if (langSelect) {
    langSelect.value = savedLang;
    applyLanguage(savedLang);
  }
});

function changeLanguage() {
  const lang = document.getElementById("langSelect").value;
  localStorage.setItem("lang", lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach((el) => {
    const key = el.getAttribute("data-lang");
    if (translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });

  const resultDiv = document.getElementById("result");
  if (resultDiv && resultDiv.style.display === "block") {
    recommend(); // Re-run recommendation to translate result
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  const btn = document.getElementById("themeToggle");
  if (btn) btn.innerText = isDark ? "☀️" : "🌓";
}

function recommend() {
  const streamEl = document.getElementById("stream"); // These elements are now always present on index.html
  const interestEl = document.getElementById("interest"); // These elements are now always present on index.html
  const langEl = document.getElementById("langSelect"); // This element is now always present on index.html
  const resultDiv = document.getElementById("result"); // This element is now always present on index.html

  if (!streamEl || !interestEl || !resultDiv) return;

  const stream = streamEl.value;
  const interest = interestEl.value;
  const lang = langEl ? langEl.value : "en";

  let career = {
    title: "",
    why: "",
    roadmap: "",
    future: "",
    excellence: "",
  };

  const labels = {
    en: {
      why: "Why this fits you",
      roadmap: "Actionable Roadmap",
      future: "Future Outlook",
      achieve: "How to Achieve More",
    },
    hi: {
      why: "यह आपके लिए क्यों सही है",
      roadmap: "कार्ययोजना",
      future: "भविष्य की संभावनाएं",
      achieve: "इस क्षेत्र में उत्कृष्टता कैसे प्राप्त करें",
    },
  };

  // Rule-Based Logic
  if (stream === "PCM") {
    if (interest === "Technology") {
      career.title = "Software Architect / AI Specialist";
      career.why =
        "High logical aptitude in PCM complements complex algorithm design and system architecture.";
      career.roadmap =
        "1. Focus on JEE/Competitive exams. 2. Pursue B.Tech in CSE. 3. Learn Python and Data Structures.";
      career.future =
        "AI is projected to contribute $15.7 trillion to the global economy by 2030. Job security is exceptionally high.";
      career.excellence =
        "Participate in Open Source projects and Hackathons to build a strong portfolio.";
    } else if (interest === "Finance") {
      career.title = "Quantitative Analyst (Quant)";
      career.why =
        "Your advanced math skills are vital for high-frequency trading models and risk assessment.";
      career.roadmap =
        "Pursue a degree in Financial Engineering or Math. Obtain CFA certification.";
      career.future =
        "FinTech is revolutionizing banking; Quants are the backbone of modern wall street.";
      career.excellence =
        "Master stochastic calculus and programming languages like C++ or Python for high-performance computing.";
    } else {
      career.title = "Sustainable Infrastructure Engineer";
      career.why =
        "Combining Physics with design to solve urban housing and climate challenges.";
      career.roadmap =
        "Focus on Civil or Environmental Engineering. Master AutoCAD and BIM software.";
      career.future =
        "Green construction is the future as cities worldwide aim for Net Zero emissions.";
      career.excellence =
        "Get certified in sustainable design (e.g., LEED) and explore smart city technologies.";
    }
  } else if (stream === "PCB") {
    if (interest === "Healthcare") {
      career.title = "Robotic Surgeon / Specialized Physician";
      career.why =
        "Healthcare is integrating AI-assisted surgery, requiring biological expertise with tech-literacy.";
      career.roadmap =
        "Clear NEET. Complete MBBS. Specialize in Robotics or Precision Medicine.";
      career.future =
        "Personalized medicine based on genetics is the next frontier in human longevity.";
      career.excellence =
        "Stay updated with medical journals and gain hands-on experience through internships.";
    } else {
      career.title = "Bioinformatics Scientist";
      career.why =
        "Uses biology and computer science to analyze biological data like DNA sequences.";
      career.roadmap =
        "Degrees in Biotech or Genetics. Master R and Bio-Python programming.";
      career.future =
        "Essential for future pandemic prevention and crop resilience in climate change.";
      career.excellence =
        "Contribute to genomic research databases and master data visualization tools.";
    }
  } else if (stream === "Commerce") {
    if (interest === "Finance") {
      career.title = "Cryptocurrency Consultant / Forensic Accountant";
      career.why =
        "Traditional accounting is evolving into digital asset management and fraud detection.";
      career.roadmap =
        "Complete CA/CPA. Specialize in Blockchain or Forensic Audit.";
      career.future =
        "Global digital economies require transparent and secure financial tracking.";
      career.excellence =
        "Obtain specialized certifications in blockchain security and financial forensics.";
    } else {
      career.title = "Global Startup Founder";
      career.why =
        "Commerce provides the fundamental understanding of markets, supply chains, and scaling.";
      career.roadmap =
        "Pursue BBA/B.Com. Focus on Networking and Product-Market Fit.";
      career.future =
        "The 'Startup India' initiative and venture capital growth make this the best time to build.";
      career.excellence =
        "Focus on building a strong professional network and learning lean startup methodologies.";
    }
  } else if (stream === "Arts") {
    if (interest === "Social") {
      career.title = "Policy Analyst / International Human Rights Lawyer";
      career.why =
        "Arts students have the deep context of history and sociology needed to draft laws.";
      career.roadmap =
        "Clear CLAT or UPSC. Master in Public Policy or International Relations.";
      career.future =
        "As global conflicts and climate migration increase, skilled diplomats and lawyers are crucial.";
      career.excellence =
        "Engage in public speaking and intern with international NGOs to gain global perspective.";
    } else {
      career.title = "UX Researcher / Digital Ethicist";
      career.why =
        "Tech companies need Arts majors to understand human behavior and ethical design.";
      career.roadmap =
        "Degree in Psychology or Design. Certification in User Experience (UX).";
      career.future =
        "The Metaverse and AI-Human interaction require experts who understand the 'human' side.";
      career.excellence =
        "Build a diverse design portfolio and study the intersection of technology and sociology.";
    }
  }

  // Professional Output Formatting
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `
        <div class="result-header">
            <h3 style="color: var(--primary-color); margin-top: 0; font-size: 1.5rem;">
                🎯 Recommended: ${career.title}
            </h3>
        </div>
        <div class="result-body">
            <p><strong>${labels[lang].why}:</strong> ${career.why}</p>
            <div class="roadmap-box" style="background: var(--bg-color); padding: 15px; border-radius: 8px; border-left: 4px solid var(--primary-color); margin: 15px 0;">
                <strong>🚀 ${labels[lang].roadmap}:</strong><br> ${career.roadmap}
            </div>
            <p><strong>🔮 ${labels[lang].future}:</strong> ${career.future}</p>
            ${
              career.excellence
                ? `<div class="excellence-box" style="margin-top:10px; padding: 10px; border: 1px dashed var(--primary-color); border-radius: 8px;">
                <strong>🌟 ${labels[lang].achieve}:</strong> ${career.excellence}
            </div>`
                : ""
            }
        </div>
        <div style="margin-top: 20px; font-size: 0.85rem; border-top: 1px solid var(--border-color); padding-top: 15px; color: #64748b;">
            <small>This recommendation aligns with <strong>SDG 4</strong> by providing quality guidance based on your academic stream.</small>
        </div>
    `;

  resultDiv.scrollIntoView({ behavior: "smooth" });
}
