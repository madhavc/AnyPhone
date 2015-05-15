### AnyPhone
##### An example iOS (Swift) app for phone-based user accounts with Twilio + Parse

---

#### Requirements

* Parse account (Sign up at [Parse.com](https://parse.com))
* Twilio account & phone number (Sign up at [Twilio.com](https://twilio.com))

#### Getting Started

* Create a new Parse App, and [set up a Cloud Code folder](https://parse.com/docs/js/guide#cloud-code) for the project.  
* Copy the `cloud/main.js` file from this repository into the `cloud/` folder in your Cloud Code folder.  
* Edit `main.js` to include your Twilio Account Sid, Auth Token, and phone number.  Generate some random string to use as the password token.  
* Open the AnyPhone Xcode project, and put your Parse Application Id and Client Key in `AppDelegate.swift`.
* Deploy your Cloud Code by running `parse deploy` from the root of your Cloud Code folder.

#### Optionally

* Lock down the User class in the Data Browser.  Remove all permissions except Update from the Public role.  This is a good idea even though we're already setting a restrictive ACL on each User we create through this process.  You can remove the "Add Field" permission only after using the app, or after manually creating the additional columns.
* Get involved and contribute to the project:
  * Enhance the input validation to support more countries and number formats
  * Improvements to the flow and user experience
  * Add brute-force protection, resetting the code after a few failed attempts
  

