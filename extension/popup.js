// import { title } from "process";

document.addEventListener("DOMContentLoaded", () => {
    const titleInput = document.getElementById("title");
    const companyInput = document.getElementById("company");
    const idInput = document.getElementById("url");
    const buttonInput = document.getElementById("save");
    const statusInput = document.getElementById("status");

    chrome.tabs.query({active: true, currentWindow:true}, (tabs) => {
        const tab = tabs[0];
        if (!tab) return;

        titleInput.value = tab.title || "";
        idInput.textContent = tab.url || "";
    });

    buttonInput.addEventListener("click", async () => {
        const payload = {
            company: companyInput.value,
            position: titleInput.value,
            status: "Applied",
            notes: idInput.textContent,
        };

        console.log("Saved Payload:", payload);
        statusInput.textContent = "Logged to console";

        try {
            const response = await fetch("http://localhost:5000/jobs", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok){
                statusInput.textContent = "Saved";
            } 
            else {
                statusInput.textContent = "Failed";
            }
        }
        catch (err) {
            statusInput.textContent = "Network error!"
        }
    })
});