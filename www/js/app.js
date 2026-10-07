// -----------------------------
// SCREENS
// -----------------------------

const loginScreen =
    document.getElementById("loginScreen");

const homeScreen =
    document.getElementById("homeScreen");

const reportScreen =
    document.getElementById("reportScreen");


// -----------------------------
// LOGIN
// -----------------------------

const loginForm =
    document.getElementById("loginForm");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginMessage =
    document.getElementById("loginMessage");

const logoutButton =
    document.getElementById("logoutButton");


// -----------------------------
// SIGN UP
// -----------------------------

const signupForm =
    document.getElementById("signupForm");

const signupEmailInput =
    document.getElementById("signupEmail");

const signupPasswordInput =
    document.getElementById("signupPassword");

const confirmPasswordInput =
    document.getElementById("confirmPassword");


// -----------------------------
// AUTH CONTROLS
// -----------------------------

const showSignupButton =
    document.getElementById("showSignupButton");

const togglePassword =
    document.getElementById("togglePassword");

const authSwitch =
    document.getElementById("authSwitch");


// -----------------------------
// NAVIGATION
// -----------------------------

const openReportButton =
    document.getElementById("openReportButton");

const backHomeButton =
    document.getElementById("backHomeButton");

const incidentsNav =
    document.getElementById("incidentsNav");

const myReportsNav =
    document.getElementById("myReportsNav");


// -----------------------------
// REPORT FORM
// -----------------------------

const reportForm =
    document.getElementById("reportForm");

const titleInput =
    document.getElementById("incidentTitle");

const categoryInput =
    document.getElementById("incidentCategory");

const descriptionInput =
    document.getElementById("incidentDescription");

const imageInput =
    document.getElementById("incidentImage");

const locationButton =
    document.getElementById("getLocationButton");

const locationStatus =
    document.getElementById("locationStatus");

const latitudeInput =
    document.getElementById("latitude");

const longitudeInput =
    document.getElementById("longitude");

const reportMessage =
    document.getElementById("reportMessage");

const imagePreview =
    document.getElementById("imagePreview");

const previewImage =
    document.getElementById("previewImage");


// -----------------------------
// CATEGORY NORMALIZER
// -----------------------------

function normalizeCategory(category) {

    const value =
        String(category || "")
            .trim()
            .toLowerCase();

    switch (value) {

        case "accident":
            return "Accident";

        case "fighting":
        case "fight":
        case "fighting incident":
            return "Fighting";

        case "rioting":
        case "riot":
        case "rioting incident":
            return "Rioting";

        case "fire":
        case "fire incident":
        case "market fire":
            return "Fire";

        case "other":
            return "Other";

        default:
            return "Other";
    }
}


// -----------------------------
// LOGIN
// -----------------------------

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value.trim();


        if (!email || !password) {

            loginMessage.textContent =
                "Please enter your email and password.";

            return;
        }


        loginMessage.textContent =
            "Logging in...";


        try {

            await auth.signInWithEmailAndPassword(
                email,
                password
            );

            loginMessage.textContent = "";

        } catch (error) {

            console.error(error);

            loginMessage.textContent =
                getAuthErrorMessage(error);

        }

    }
);


// -----------------------------
// SIGN UP
// -----------------------------

signupForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const email =
            signupEmailInput.value.trim();

        const password =
            signupPasswordInput.value.trim();

        const confirmPassword =
            confirmPasswordInput.value.trim();


        if (
            !email ||
            !password ||
            !confirmPassword
        ) {

            loginMessage.textContent =
                "Please fill in all fields.";

            return;
        }


        if (password.length < 6) {

            loginMessage.textContent =
                "Password must be at least 6 characters.";

            return;
        }


        if (password !== confirmPassword) {

            loginMessage.textContent =
                "Passwords do not match.";

            return;
        }


        loginMessage.textContent =
            "Creating your account...";


        try {

            await auth.createUserWithEmailAndPassword(
                email,
                password
            );


            loginMessage.textContent =
                "Account created successfully!";


            signupForm.reset();

        } catch (error) {

            console.error(error);

            loginMessage.textContent =
                getAuthErrorMessage(error);

        }

    }
);


// -----------------------------
// SHOW SIGN UP
// -----------------------------

showSignupButton.addEventListener(
    "click",
    showSignupForm
);


function showSignupForm() {

    loginForm.classList.add("hidden");

    signupForm.classList.remove("hidden");


    authSwitch.innerHTML = `
        Already have an account?

        <button
            type="button"
            id="showLoginButton"
            class="text-button"
        >
            Login
        </button>
    `;


    document
        .getElementById("showLoginButton")
        .addEventListener(
            "click",
            showLoginForm
        );


    loginMessage.textContent = "";

}


// -----------------------------
// SHOW LOGIN
// -----------------------------

function showLoginForm() {

    signupForm.classList.add("hidden");

    loginForm.classList.remove("hidden");


    authSwitch.innerHTML = `
        Don't have an account?

        <button
            type="button"
            id="showSignupButton"
            class="text-button"
        >
            Create one
        </button>
    `;


    document
        .getElementById("showSignupButton")
        .addEventListener(
            "click",
            showSignupForm
        );


    loginMessage.textContent = "";

}


// -----------------------------
// SHOW / HIDE PASSWORD
// -----------------------------

togglePassword.addEventListener(
    "click",
    () => {

        if (
            passwordInput.type === "password"
        ) {

            passwordInput.type = "text";

            togglePassword.textContent =
                "Hide";

        } else {

            passwordInput.type = "password";

            togglePassword.textContent =
                "Show";

        }

    }
);


// -----------------------------
// AUTH ERROR MESSAGES
// -----------------------------

function getAuthErrorMessage(error) {

    switch (error.code) {

        case "auth/invalid-credential":
            return "Invalid email or password.";

        case "auth/user-not-found":
            return "No account exists with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/email-already-in-use":
            return "An account already exists with this email.";

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/weak-password":
            return "Password must be at least 6 characters.";

        case "auth/operation-not-allowed":
            return "Email/password sign-in has not been enabled.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        default:
            return "Something went wrong. Please try again.";

    }

}


// -----------------------------
// LOGOUT
// -----------------------------

logoutButton.addEventListener(
    "click",
    async () => {

        try {

            await auth.signOut();


            loginScreen.classList.remove(
                "hidden"
            );

            homeScreen.classList.add(
                "hidden"
            );

            reportScreen.classList.add(
                "hidden"
            );


            emailInput.value = "";

            passwordInput.value = "";

            signupEmailInput.value = "";

            signupPasswordInput.value = "";

            confirmPasswordInput.value = "";


        } catch (error) {

            console.error(error);

        }

    }
);


// -----------------------------
// SCREEN NAVIGATION
// -----------------------------

function showHomeScreen() {

    loginScreen.classList.add(
        "hidden"
    );

    reportScreen.classList.add(
        "hidden"
    );

    homeScreen.classList.remove(
        "hidden"
    );


    displayReports();

}


function showReportScreen() {

    loginScreen.classList.add(
        "hidden"
    );

    homeScreen.classList.add(
        "hidden"
    );

    reportScreen.classList.remove(
        "hidden"
    );

}


openReportButton.addEventListener(
    "click",
    showReportScreen
);


backHomeButton.addEventListener(
    "click",
    showHomeScreen
);


incidentsNav.addEventListener(
    "click",
    showHomeScreen
);


// -----------------------------
// GET CURRENT LOCATION
// -----------------------------

locationButton.addEventListener(
    "click",
    () => {

        if (!navigator.geolocation) {

            locationStatus.textContent =
                "Geolocation is not supported.";

            return;

        }


        locationStatus.textContent =
            "Getting your location...";


        navigator.geolocation.getCurrentPosition(

            (position) => {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;


                latitudeInput.value =
                    latitude;

                longitudeInput.value =
                    longitude;


                locationStatus.textContent =
                    `Location captured: ${latitude.toFixed(
                        5
                    )}, ${longitude.toFixed(5)}`;

            },


            (error) => {

                console.error(error);

                locationStatus.textContent =
                    "Unable to get your location. Please try again.";

            },


            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }

        );

    }
);


// -----------------------------
// IMAGE PREVIEW
// -----------------------------

imageInput.addEventListener(
    "change",
    () => {

        const file =
            imageInput.files[0];


        if (!file) {

            imagePreview.classList.add(
                "hidden"
            );

            previewImage.src = "";

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            (event) => {

                previewImage.src =
                    event.target.result;

                imagePreview.classList.remove(
                    "hidden"
                );

            };


        reader.readAsDataURL(file);

    }
);


// -----------------------------
// CONVERT IMAGE TO BASE64
// -----------------------------

function convertImageToBase64(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload = () => {

                resolve(
                    reader.result
                );

            };


            reader.onerror = () => {

                reject(
                    new Error(
                        "Unable to read image."
                    )
                );

            };


            reader.readAsDataURL(file);

        }
    );

}


// -----------------------------
// SUBMIT REPORT
// -----------------------------

reportForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const currentUser =
            auth.currentUser;


        if (!currentUser) {

            alert(
                "Please login first."
            );

            return;

        }


        const title =
            titleInput.value.trim();

        const category =
            normalizeCategory(
                categoryInput.value
            );

        const description =
            descriptionInput.value.trim();

        const latitude =
            latitudeInput.value;

        const longitude =
            longitudeInput.value;


        if (
            !title ||
            !category ||
            !description
        ) {

            reportMessage.textContent =
                "Please fill in all required fields.";

            return;

        }


        reportMessage.textContent =
            "Submitting incident...";


        try {

            let imageData = null;


            if (
                imageInput.files.length > 0
            ) {

                imageData =
                    await convertImageToBase64(
                        imageInput.files[0]
                    );

            }


            const report = {

                title: title,

                category: category,

                description: description,

                latitude:
                    latitude || null,

                longitude:
                    longitude || null,

                image: imageData,

                submittedBy:
                    currentUser.email,

                userId:
                    currentUser.uid,

                date:
                    firebase.firestore.FieldValue
                        .serverTimestamp()

            };


            await db
                .collection("incidents")
                .add(report);


            reportMessage.textContent =
                "Incident submitted successfully.";


            reportForm.reset();


            latitudeInput.value = "";

            longitudeInput.value = "";


            locationStatus.textContent =
                "Location has not been captured.";


            imagePreview.classList.add(
                "hidden"
            );

            previewImage.src = "";


            setTimeout(
                () => {

                    reportMessage.textContent =
                        "";

                    showHomeScreen();

                },
                1000
            );


        } catch (error) {

            console.error(error);

            reportMessage.textContent =
                "Failed to submit incident. Please try again.";

        }

    }
);


// -----------------------------
// CREATE INCIDENT CARD
// -----------------------------

function createIncidentCard(report) {

    const card =
        document.createElement("div");


    card.className =
        "incident-card";


    const date =
        report.date &&
        report.date.toDate
            ? report.date.toDate()
            : null;


    // IMPORTANT:
    // Always normalize the category
    // before displaying it.

    const category =
        normalizeCategory(
            report.category
        );


    card.innerHTML = `

        <div class="incident-header">

            <h3>
                ${escapeHtml(
                    report.title ||
                    "Untitled Incident"
                )}
            </h3>


            <span class="incident-category">

                ${escapeHtml(category)}

            </span>

        </div>


        <p>

            ${escapeHtml(
                report.description ||
                "No description provided."
            )}

        </p>


        ${
            report.image
                ? `

                    <img
                        src="${report.image}"
                        alt="Incident picture"
                        style="
                            width:100%;
                            max-height:250px;
                            object-fit:cover;
                            border-radius:12px;
                            margin-top:10px;
                        "
                    >

                `
                : ""
        }


        ${
            report.latitude !== null &&
            report.latitude !== undefined &&
            report.longitude !== null &&
            report.longitude !== undefined
                ? `

                    <div class="incident-location">

                        📍
                        ${Number(
                            report.latitude
                        ).toFixed(5)},

                        ${Number(
                            report.longitude
                        ).toFixed(5)}

                    </div>

                `
                : ""
        }


        <small>

            Reported by:
            ${escapeHtml(
                report.submittedBy ||
                "Unknown"
            )}

            ${
                date
                    ? `

                        <br>

                        ${date.toLocaleString()}

                    `
                    : ""
            }

        </small>

    `;


    return card;

}


// -----------------------------
// DISPLAY REPORTS
// -----------------------------

async function displayReports(
    category = "All"
) {

    const reportsContainer =
        document.getElementById(
            "reportsContainer"
        );


    if (!reportsContainer) {
        return;
    }


    reportsContainer.innerHTML = `
        <div class="empty-state">

            <h3>
                Loading incidents...
            </h3>

            <p>
                Please wait.
            </p>

        </div>
    `;


    try {

        const snapshot =
            await db
                .collection("incidents")
                .orderBy(
                    "date",
                    "desc"
                )
                .get();


        let reports =
            snapshot.docs.map(
                (doc) => ({

                    id: doc.id,

                    ...doc.data()

                })
            );


        // -----------------------------
        // FILTER CATEGORY
        // -----------------------------

        if (category !== "All") {

            const selectedCategory =
                normalizeCategory(
                    category
                );


            reports =
                reports.filter(
                    (report) => {

                        const reportCategory =
                            normalizeCategory(
                                report.category
                            );


                        return (
                            reportCategory ===
                            selectedCategory
                        );

                    }
                );

        }


        // -----------------------------
        // NO REPORTS
        // -----------------------------

        if (reports.length === 0) {

            reportsContainer.innerHTML = `
                <div class="empty-state">

                    <h3>
                        No incidents found
                    </h3>

                    <p>
                        There are no reports in this category yet.
                    </p>

                </div>
            `;

            return;

        }


        reportsContainer.innerHTML = "";


        // -----------------------------
        // DISPLAY REPORTS
        // -----------------------------

        reports.forEach(
            (report) => {

                reportsContainer.appendChild(
                    createIncidentCard(report)
                    
                );

            }
        );


    } catch (error) {

        console.error(error);


        reportsContainer.innerHTML = `
            <div class="empty-state">

                <h3>
                    Unable to load incidents
                </h3>

                <p>
                    Please check your connection and try again.
                </p>

            </div>
        `;

    }

}


// -----------------------------
// CATEGORY FILTER
// -----------------------------

const categoryButtons =
    document.querySelectorAll(
        ".category-button"
    );


categoryButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                categoryButtons.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const category =
                    button.dataset.category;


                displayReports(
                    category
                );

            }
        );

    }
);


// -----------------------------
// MY REPORTS
// -----------------------------

myReportsNav.addEventListener(
    "click",
    async () => {

        const currentUser =
            auth.currentUser;


        if (!currentUser) {
            return;
        }


        const reportsContainer =
            document.getElementById(
                "reportsContainer"
            );


        reportsContainer.innerHTML = `
            <div class="empty-state">

                <h3>
                    Loading your reports...
                </h3>

                <p>
                    Please wait.
                </p>

            </div>
        `;


        try {

            const snapshot =
                await db
                    .collection("incidents")
                    .where(
                        "userId",
                        "==",
                        currentUser.uid
                    )
                    .get();


            const myReports =
                snapshot.docs
                    .map(
                        (doc) => ({

                            id: doc.id,

                            ...doc.data()

                        })
                    )
                    .sort(
                        (a, b) => {

                            const dateA =
                                a.date &&
                                a.date.toDate
                                    ? a.date.toDate()
                                    : new Date(0);


                            const dateB =
                                b.date &&
                                b.date.toDate
                                    ? b.date.toDate()
                                    : new Date(0);


                            return dateB - dateA;

                        }
                    );


            if (
                myReports.length === 0
            ) {

                reportsContainer.innerHTML = `
                    <div class="empty-state">

                        <h3>
                            No reports yet
                        </h3>

                        <p>
                            You have not submitted
                            any incidents.
                        </p>

                    </div>
                `;

                return;

            }


            reportsContainer.innerHTML = "";


            myReports.forEach(
                (report) => {

                    reportsContainer.appendChild(
                        createIncidentCard(report)
                    );

                }
            );


        } catch (error) {

            console.error(error);


            reportsContainer.innerHTML = `
                <div class="empty-state">

                    <h3>
                        Unable to load your reports
                    </h3>

                    <p>
                        Please try again.
                    </p>

                </div>
            `;

        }

    }
);


// -----------------------------
// REAL-TIME NOTIFICATIONS
// -----------------------------

let isFirstIncidentLoad = true;


db.collection("incidents")
    .orderBy("date", "desc")
    .onSnapshot(
        (snapshot) => {

            snapshot.docChanges().forEach(
                (change) => {

                    if (
                        change.type !== "added"
                    ) {

                        return;

                    }


                    if (isFirstIncidentLoad) {

                        return;

                    }


                    const incident =
                        change.doc.data();


                    showNotification(
                        incident
                    );

                }
            );


            isFirstIncidentLoad = false;

        },


        (error) => {

            console.error(
                "Notification listener error:",
                error
            );

        }
    );


// -----------------------------
// SHOW NOTIFICATION
// -----------------------------

function showNotification(
    incident
) {

    const notificationContainer =
        document.getElementById(
            "notificationContainer"
        );


    if (!notificationContainer) {
        return;
    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "notification";


    notification.innerHTML = `

        <div class="notification-title">

            🔔 New Incident Reported

        </div>


        <div class="notification-message">

            ${escapeHtml(
                incident.title ||
                "A new incident has been reported."
            )}

        </div>

    `;


    notificationContainer.appendChild(
        notification
    );


    setTimeout(
        () => {

            notification.remove();

        },
        5000
    );

}


// -----------------------------
// SECURITY HELPER
// -----------------------------

function escapeHtml(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value ?? "";


    return div.innerHTML;

}


// -----------------------------
// FIREBASE AUTH STATE
// -----------------------------

auth.onAuthStateChanged(
    (user) => {

        if (user) {

            showHomeScreen();

        } else {

            loginScreen.classList.remove(
                "hidden"
            );

            homeScreen.classList.add(
                "hidden"
            );

            reportScreen.classList.add(
                "hidden"
            );

        }

    }
);