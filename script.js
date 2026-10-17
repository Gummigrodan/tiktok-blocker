// 1. Fixat stort S i SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Den här webbläsaren stöder inte röstigenkänning, du får väl bara avstå från att använda tiktok.");
} else {
    const recognition = new SpeechRecognition();

    // 2. Fixat litet l i recognition.lang
    recognition.lang = "sv-SE";
    recognition.continuous = true;
    recognition.interimResults = false;

    const startKnapp = document.getElementById('start-knapp');

    if (startKnapp) {
        startKnapp.addEventListener('click', () => {
            try {
                recognition.start();
                // 3. Tog bort statusText eftersom det elementet inte finns i din HTML just nu
                console.log("Lyssnar... Säg till exempel 'och då sa jag till den lilla grabben, ta inte min öl'");
            } catch (err) {
                console.log("Röstigenkänningen är redan igång.");
            }
        });
    }

    recognition.onresult = (event) => {
        const sistaResultatIndex = event.results.length - 1;
        // 4. Hämtar texten korrekt med [0]
        const mening = event.results[sistaResultatIndex][0].transcript.trim().toLowerCase();
        
        console.log("Användaren sa: " + mening);

        // Kollar om meningen innehåller ditt lösenord
        if (mening.includes("och då sa jag till den lilla grabben, ta inte min öl")) {
            console.log("Rätt lösenord! Öppnar TikTok...");
            window.location.href = "snssdk1233://"; 
        }
    };

    // Bra att ha: fångar upp om något går fel (t.ex. blockerad mikrofon)
    recognition.onerror = (event) => {
        console.error("Fel uppstod:", event.error);
    };
}
