db.collection(`rooms/${userroom}/booking`)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data().starttime, doc.data().endtime);
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
