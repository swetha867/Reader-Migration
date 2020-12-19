export const setUserID=userId =>({
    type: 'USER_SET_USER_ID',
    userId,
});
export const setStudentId=student_id =>({
    type: 'USER_SET_STUDENT_ID',
    student_id,
});
export const setIsLoggedIn=isLoggedIn =>({
    type: 'USER_SET_IS_LOGGED_IN',
    isLoggedIn,
});
export const setIsTeacher =isTeacher =>({
    type: 'USER_SET_ISTEACHER',
    isTeacher,
});
export const setEmail=email =>({
    type: 'USER_SET_EMAIL',
    email,
});
// export const saveNote=note =>({
//     type: 'USER_SAVE_NOTE',
//     note,
// });
// export const showNoteList=noteList =>({
//     type: 'USER_SHOW_NOTE_LIST',
//     noteList,
// });

//setUser('Hello')-->{type: 'USER_SET_USER', user:hello}