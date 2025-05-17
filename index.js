const userForm = document.getElementById("user-form");
const entriesContainer = document.getElementById("user-entries");
const dobError = document.getElementById("dob-error");

const retrieveEntries = () => {
    const entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
};

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();

    // if (!entries.length) {
    //     entriesContainer.innerHTML = "<p class='text-gray-500 text-center'>No entries found.</p>";
    //     return;
    // }

    const tableEntries = entries.map(entry => `
        <tr class="bg-white border">
            <td class="border px-4 py-2">${entry.name}</td>
            <td class="border px-4 py-2">${entry.email}</td>
            <td class="border px-4 py-2">${entry.password}</td>
            <td class="border px-4 py-2">${entry.dob}</td>
            <td class="border px-4 py-2">${entry.acceptedTerms}</td>
        </tr>
    `).join("");

    entriesContainer.innerHTML = `
        <table class="table-auto w-full text-sm text-left text-gray-600 border-collapse">
            <thead>
                <tr class="bg-blue-100">
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Email</th>
                    <th class="px-4 py-2">Password</th>
                    <th class="px-4 py-2">Dob</th>
                    <th class="px-4 py-2">Accepted terms?</th>
                </tr>
            </thead>
            <tbody>
                ${tableEntries}
            </tbody>
        </table>
    `;
};

const isValidAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 55;
};

const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("checkbox").checked;

    // Validate DOB
    if (!isValidAge(dob)) {
        dobError.classList.remove("hidden");
        return;
    } else {
        dobError.classList.add("hidden");
    }

    const entry = { name, email, password, dob, acceptedTerms };
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
    userForm.reset();
};

userForm.addEventListener("submit", saveUserForm);
displayEntries();
