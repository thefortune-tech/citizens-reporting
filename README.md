# Citizens Reporting

A mobile-first incident reporting platform that enables citizens to report, discover, and monitor incidents within their communities.

Citizens Reporting provides a centralized platform where authenticated users can submit incident reports with descriptions, categories, images, and geographical coordinates. Submitted reports become available to other authenticated users in real time, making it easier to share information about incidents within a community.

---

## Overview

**Citizens Reporting** is designed to simplify community incident reporting by providing a structured and accessible digital platform for submitting and discovering incidents.

The application supports the complete reporting workflow:

**Authenticate → Report → Capture Location → Submit → Discover → Filter**

Users can create accounts, submit incidents, browse reports submitted by the community, filter incidents by category, and access reports they personally submitted.

The application is built as a cross-platform mobile application using **Apache Cordova**, with **Firebase** providing authentication and cloud data services.

---

## Core Features

### Authentication

Users can securely access the platform through email and password authentication.

* User registration
* User login
* Persistent authentication state
* Secure logout
* Authentication error handling
* User-specific report tracking

### Incident Reporting

Authenticated users can create detailed incident reports containing:

* Incident title
* Incident category
* Description
* Image
* Latitude
* Longitude
* Submission date
* Submitting user

### Incident Categories

Reports are organized into predefined categories:

* Accident
* Fighting
* Rioting
* Fire
* Other

This allows users to quickly identify and filter incidents relevant to them.

### Real-Time Incident Feed

Newly submitted incidents are automatically reflected in the incident feed.

Users can browse available reports without manually refreshing the application.

### Category Filtering

Users can filter the incident feed by category:

* All
* Accident
* Fighting
* Rioting
* Fire
* Other

### Geolocation

The application uses device geolocation capabilities to capture the geographical coordinates associated with an incident.

Each report stores:

* Latitude
* Longitude

This provides location context for reported incidents and establishes a foundation for future map-based incident visualization.

### Image Attachments

Users can attach an image when submitting an incident report.

Images are processed within the application and stored with the corresponding report.

### My Reports

Authenticated users can view reports associated with their account.

This provides users with a personal history of incidents they have submitted.

### Notifications

The application monitors newly submitted incidents and provides in-app notifications when new reports become available.

---

## Technology Stack

| Technology              | Purpose                               |
| ----------------------- | ------------------------------------- |
| HTML5                   | Application structure                 |
| CSS3                    | User interface and responsive styling |
| JavaScript              | Application logic                     |
| Apache Cordova          | Mobile application runtime            |
| Firebase Authentication | User authentication                   |
| Cloud Firestore         | Cloud database                        |
| Browser Geolocation API | Location capture                      |
| Base64                  | Image data representation             |
| Android SDK             | Android application build             |
| Gradle                  | Android build system                  |

---

## Application Architecture

The application follows a lightweight client-side architecture suitable for a Cordova-based mobile application.

```text
┌──────────────────────────────┐
│          Mobile UI           │
│          HTML / CSS          │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       JavaScript Layer       │
│                              │
│ • Authentication             │
│ • Navigation                 │
│ • Incident Management        │
│ • Category Filtering         │
│ • Geolocation                │
│ • Image Processing           │
│ • Notifications              │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│           Firebase           │
│                              │
│ • Firebase Authentication    │
│ • Cloud Firestore            │
└──────────────────────────────┘
```

The application separates the user interface from the application logic while using Firebase as the backend service.

---

## Project Structure

```text
citizens-reporting/
│
├── www/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   └── app.js
│   │
│   └── index.html
│
├── config.xml
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

### `www/index.html`

Contains the application's interface and Firebase initialization.

### `www/css/style.css`

Contains the application's visual design, layouts, responsive styling, and component styles.

### `www/js/app.js`

Contains the application's core logic, including authentication, incident management, Firestore operations, filtering, geolocation, image processing, and notifications.

### `config.xml`

Contains the Cordova application configuration and metadata.

### `package.json`

Defines the project's Node.js dependencies and Cordova configuration.

---

## Data Model

Incident reports are stored as documents in the `incidents` Firestore collection.

A report follows the following general structure:

```text
{
    title,
    category,
    description,
    latitude,
    longitude,
    image,
    submittedBy,
    userId,
    date
}
```

### Field Description

| Field         | Description                             |
| ------------- | --------------------------------------- |
| `title`       | Name/title of the incident              |
| `category`    | Incident classification                 |
| `description` | Detailed information about the incident |
| `latitude`    | Geographical latitude                   |
| `longitude`   | Geographical longitude                  |
| `image`       | Attached image data                     |
| `submittedBy` | User associated with the report         |
| `userId`      | Firebase Authentication user ID         |
| `date`        | Report submission timestamp             |

---

## Authentication & Authorization

Firebase Authentication is used to manage user identity.

The application requires authentication before users can access protected application functionality.

Firestore authorization is designed around the authenticated user's identity.

Users can create reports associated with their own Firebase user ID, while access to modifying or deleting reports is restricted to the user who originally submitted them.

This prevents authenticated users from modifying another user's reports.

---

## Security Rules

The Firestore security model follows the principle of restricting data operations to authenticated users and associating write permissions with the report owner.

The intended authorization model is:

```text
Authenticated users
        │
        ├── Read incidents
        │
        └── Create incidents
                │
                └── userId must match
                    authenticated user ID

Report owner
        │
        ├── Update own report
        └── Delete own report
```

Production deployments should ensure that Firestore security rules are enabled and reviewed before release.

---

## Getting Started

### Prerequisites

Before running the project locally, install:

* Node.js
* npm
* Apache Cordova CLI
* Java JDK
* Android Studio
* Android SDK
* Android build tools

Verify the required tools:

```bash
node --version
npm --version
cordova --version
java --version
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/thefortune-tech/citizens-reporting.git
```

Navigate into the project:

```bash
cd citizens-reporting
```

Install dependencies:

```bash
npm install
```

Add the Android platform:

```bash
cordova platform add android
```

---

## Firebase Configuration

The application uses Firebase Authentication and Cloud Firestore.

To configure Firebase for another environment:

1. Create a Firebase project.
2. Enable **Email/Password Authentication**.
3. Create a **Cloud Firestore** database.
4. Register a Firebase Web App.
5. Copy the Firebase configuration.
6. Update the Firebase configuration in `www/index.html`.

Example:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

> Never commit private credentials, service-account keys, passwords, or other server-side secrets to the repository.

---

## Running the Application

### Build Android APK

```bash
cordova build android
```

The debug APK is generated at:

```text
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### Run on a Connected Android Device

Connect an Android device with USB debugging enabled and run:

```bash
cordova run android
```

Alternatively, the generated APK can be installed manually on an Android device for testing.

---

## Application Workflow

### 1. Authentication

```text
Launch Application
       ↓
Login / Register
       ↓
Firebase Authentication
       ↓
Authenticated User
```

### 2. Submit Incident

```text
Create Report
       ↓
Enter Incident Information
       ↓
Select Category
       ↓
Attach Image
       ↓
Capture Location
       ↓
Submit Report
       ↓
Cloud Firestore
```

### 3. Discover Incidents

```text
Cloud Firestore
       ↓
Incident Feed
       ↓
Category Filter
       ↓
View Incident
```

### 4. Personal Reports

```text
Authenticated User
       ↓
My Reports
       ↓
Reports associated with userId
```

---

## Error Handling

The application handles common user and authentication errors, including:

* Invalid login credentials
* Invalid email addresses
* Weak passwords
* Existing accounts
* Authentication failures
* Missing report information
* Location access failures
* Image selection issues
* Firestore operation failures

User-facing errors are displayed through the application interface to provide feedback during failed operations.

---

## Testing

The application has been tested against the primary user flows, including:

* Account registration
* User authentication
* Logout
* Incident creation
* Category selection
* Category filtering
* Image selection
* Geolocation
* Firestore data submission
* Incident retrieval
* My Reports
* New incident notifications
* Android APK generation

The Android application has been successfully compiled using the Cordova Android build pipeline.

---

## Current Scope

The current release focuses on the core incident reporting workflow:

* Authentication
* Incident creation
* Incident discovery
* Categorization
* Geolocation
* Image attachments
* User-specific reports
* Real-time incident updates

The architecture provides a foundation for extending the application with additional services and functionality.

---

## Future Roadmap

Potential improvements include:

### Maps & Location

* Interactive map view
* Display incidents on a map
* Location-based incident discovery
* Distance-based filtering

### Notifications

* Firebase Cloud Messaging
* Push notifications
* Category-specific notifications
* Location-based notifications

### Media

* Firebase Cloud Storage
* Image compression
* Multiple images per report
* Improved media management

### Moderation

* Administrative dashboard
* Report verification
* Report status management
* Content moderation
* Report escalation

### User Experience

* User profiles
* Offline support
* Improved accessibility
* Advanced search
* Incident history
* Dark mode

### Platform Expansion

* iOS support
* Web administration dashboard
* Progressive Web App support

---

## Known Limitations

The current implementation has several intentional limitations:

1. Images are currently represented as Base64 data rather than being uploaded to Firebase Storage.
2. The current notification mechanism is application-level rather than a full push-notification infrastructure.
3. The current mobile target is Android.
4. There is currently no administrative moderation dashboard.
5. Map visualization has not yet been integrated.

These limitations do not prevent the core incident reporting workflow from operating.

---

## Build & Deployment

The project uses Apache Cordova to package the web-based application into a native Android application.

The general build pipeline is:

```text
HTML / CSS / JavaScript
          ↓
      Cordova
          ↓
   Android Platform
          ↓
       Gradle
          ↓
      Android APK
```

For production distribution, the application should be configured with a release signing key and built using a release configuration rather than the debug APK.

---

## Contributing

Contributions are welcome.

To contribute:

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Test the application.
5. Commit your changes.

```bash
git add .
git commit -m "Add your feature"
```

6. Push your branch.

```bash
git push origin feature/your-feature
```

7. Open a Pull Request.

---

## License

This project is currently provided for development and assessment purposes.

A formal open-source license may be added when the project is prepared for public distribution.

---

## Developer

**Fortune Adeboye**

Software Engineering Student & Mobile Application Developer

GitHub: [thefortune-tech](https://github.com/thefortune-tech)

---

## Project Status

**Status:** Active Development

The core incident reporting workflow is implemented and the Android application can be built successfully using Apache Cordova.
