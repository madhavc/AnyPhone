package com.parse.anyphone;

import com.parse.Parse;

/**
 * Created by Madhav Chhura on 7/1/15.
 */
public class Application extends android.app.Application {
    public void onCreate(){

        // Enable Local Datastore.
        //Parse.enableLocalDatastore(this);

        Parse.initialize(this, "xuOtNShZhO5haAKndUgLZNkXBsmsMngXfqWzEnqT", "rxDmDXCKUK0zGOfLaNJdJiX7kF5OxsIjvnyhUdF6");

//        //Code below is used for Parse Notifications.
//        ParsePush.subscribeInBackground("", new SaveCallback() {
//            @Override
//            public void done(ParseException e) {
//                if (e == null) {
//                    Log.d("com.parse.push", "successfully subscribed to the broadcast channel.");
//                } else {
//                    Log.e("com.parse.push", "failed to subscribe for push", e);
//                }
//            }
//        });
    }
}