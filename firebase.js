// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// Hold a reference to the anonymous current user.
var anonymousUser = firebase.auth().currentUser;

ui.start('#firebaseui-auth-container', {
    // Whether to upgrade anonymous users should be explicitly provided.
    // The user must already be signed in anonymously before FirebaseUI is
    // rendered.
    autoUpgradeAnonymousUsers: true,
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,

        //firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        // signInFailure callback must be provided to handle merge conflicts which
        // occur when an existing credential is linked to an anonymous user.
        signInFailure: function (error) {
            // For merge conflicts, the error.code will be
            // 'firebaseui/anonymous-upgrade-merge-conflict'.
            if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
                return Promise.resolve();
            }
            // The credential the user tried to sign in with.
            var cred = error.credential;
            // Copy data from anonymous user to permanent user and delete anonymous
            // user.
            // ...
            // Finish sign-in after data is copied.
            return firebase.auth().signInWithCredential(cred);
        },
    },
});

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    autoUpgradeAnonymousUsers: true,
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,

        //firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>',
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
