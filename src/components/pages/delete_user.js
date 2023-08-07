const admin = require('firebase-admin');

admin.initializeApp();

// Lookup user accounts by uid, email, phone number of IdP-assigned uid.
// List up to 100 identifiers to lookup.
function deleteusers(uids) {
    // const uids = [
    //     {uid: 'sample-uid-1'},
    //     {uid: 'sample-uid-2'},
    //     {email: 'user1@example.org'},
    //     {phoneNumber: '+1234567890'},
    //     {providerId: 'google.com', providerUid: 'user2@google.com'},
    //   ];
      
      const markedForDelete = [];
      
      // Retrieve a batch of user accounts.
      admin.auth().getUserByEmail(uids)
        .then((result) => {
          // Mark disabled accounts for deletion.
          result.users.forEach((user) => {
              markedForDelete.push(user.uid);

          });
      
          result.notFound.forEach((uid) => {
            console.log(`No user found for identifier: ${JSON.stringify(uid)}`)
          });
        })
        .then(() => {
          // Delete all marked user accounts in a single API call.
          console.log(markedForDelete);
        //   return admin.auth().deleteUsers(markedForDelete);
        });
}

module.exports = deleteusers;
