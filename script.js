// Login Function
function login() {
    let username = document.getElementById("username").value;
    if (username === "") {
        alert("Please enter username");
    } else {
        localStorage.setItem("user", username);
        window.location.href = "dashboard.html";
    }
}

// Check login
if (window.location.pathname.includes("dashboard")) {
    if (!localStorage.getItem("user")) {
        window.location.href = "index.html";
    }
    loadNotes();
}

// Add Note
function addNote() {
    let title = document.getElementById("noteTitle").value;
    let content = document.getElementById("noteContent").value;

    if (title === "" || content === "") {
        alert("Fill all fields");
        return;
    }

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ title, content });
    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";

    loadNotes();
}

// Load Notes
function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let list = document.getElementById("notesList");
    list.innerHTML = "";

    notes.forEach((note, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<b>${note.title}</b><br>${note.content}
        <br><button onclick="deleteNote(${index})">Delete</button>`;
        list.appendChild(li);
    });
}

// Delete Note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
}

// Logout
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}