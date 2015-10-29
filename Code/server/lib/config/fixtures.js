// User Data Creation

if (Meteor.users.find().fetch().length === 0) {

    console.log('Creating users: ');

    var users = [
        {name:"Student1",email:"normal1@example.com",roles:['student']},
        {name:"Student2",email:"normal2@example.com",roles:['student']},
        {name:"Student3",email:"normal3@example.com",roles:['student']},
        {name:"Tutor1",email:"tutor1@example.com",roles:['tutor']},
        {name:"Tutor2",email:"tutor2@example.com",roles:['tutor']},
        {name:"Admin1",email:"admin1@example.com",roles:['admin']},
        {name:"Admin2",email:"admin2@example.com",roles:['admin']}
      ];

    _.each(users, function (userData) {
      var id,
          user;
      
      console.log(userData);

      id = Accounts.createUser({
        email: userData.email,
        password: "apple1",
        profile: { name: userData.name }
      });

      // email verification
      Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

      Roles.addUsersToRoles(id, userData.roles);
    
    });
  }

CalEvent = new Mongo.Collection('calevent');
/*

Meteor.startup(function(){
    Meteor.methods({
        'saveCalEvent':function(ce){
            CalEvent.insert(ce);    
        }
    })
});

*/

// :::::::::::::::::::::::::::::::
// :: REST OF DATABASE CREATION ::
// :::::::::::::::::::::::::::::::

// CREATING STATIC DEPARTMENT/COURSE COLLECTION

Catalog = new Mongo.Collection('catalogs');

// Check to see if Catalog does -not- exist
if (Catalog) {
    
    if (Catalog.find().fetch().length === 0) {

    console.log('Creating Departments/Courses: ');
    
    // and create an array of documents to be inserted
    deptInserts =
        [
            {
                // each dept document has a name
                deptName: "Mathematics",
                // and a courses array
                courses:
                    [{courseName: "MAT101"},
                     {courseName: "MAT102"},
                     {courseName: "MAT103"},
                     {courseName: "MAT104"}]
            },
            {
                deptName: "Biology",
                courses:
                    [{courseName: "BIO101"},
                     {courseName: "BIO102"},
                     {courseName: "BIO103"},
                     {courseName: "BIO104"}]
            },
            {
                deptName: "Engineering",
                courses:
                    [{courseName: "ENG101"},
                     {courseName: "ENG102"},
                     {courseName: "ENG103"},
                     {courseName: "ENG104"}]
            },
            {deptName: "Computer Science",
                courses:
                    [{courseName: "CSE101"},
                     {courseName: "CSE102"},
                     {courseName: "CSE103"},
                     {courseName: "CSE104"}]
            }
        ];

        // now we insert the document array into the collection
        for(i = 0; i < deptInserts.length; i++) {
            Catalog.insert( deptInserts[i] );
        }
    }
}
    
//}; //close the outer if statement

/* Old code
//if (Meteor.departments.find().fetch().length === 0) {

    console.log('Creating Departments: ');
    
    if (0 == 0) {       //used outer always-true if to confine staticDepts' scope

        var staticDepts = [
            [("Mathematics"),
             ("MAT101"),("MAT102"),("MAT103"),("MAT104")],
            [("Biology"),
             ("BIO101"),("BIO102"),("BIO103"),("BIO104")],
            [("Computer Science & Engineering"),
             ("CSE101"),("CSE102"),("CSE103"),("CSE104")],
            [("Computer Information Technology"),
             ("CIT101"),("CIT102"),("CIT103"),("CIT104")]
        ];

        for(d = 0; d < staticDepts.length; d++) {
            tempArray = staticDepts[d];
            Catalog.insert({department: tempArray[0]});
            //console.log(tempArray[0]);
            for(c = 1; c < tempArray.length; c++) {
                Catalog.insert({courses: {course: tempArray[c]}});
                //console.log(tempArray[c]);
            }
        }
    }
//}
*/