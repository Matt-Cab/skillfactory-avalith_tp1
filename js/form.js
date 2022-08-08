const form = document.querySelector("form");

// declared to get the custom properties created en the general.css file
const styles = getComputedStyle(document.documentElement);
const colorGradient1 = styles.getPropertyValue('--color-gradient-1');
const colorGradient2 = styles.getPropertyValue('--color-gradient-2');
const colorGradient3 = styles.getPropertyValue('--color-gradient-3');
const fontFamily = "'Oswald', sans-serif";
const fontColor = "#fff";

// styles for console.log()
const commonStyles = `
    color: ${fontColor};
    font-family: ${fontFamily};
    padding: 10px;
    font-size: 20px;
    border-radius: 5px;
`;

const styles1 = `
    background-color: ${colorGradient1};
    ${commonStyles}
`;

const styles2 = `
    background-color: ${colorGradient2};
    ${commonStyles}
`;

const styles3 = `
    background-color: ${colorGradient3};
    ${commonStyles}
`;

// console.log() of input values
form.addEventListener("submit", event => {
    event.preventDefault();
    
    const userName = form.userName.value;
    const email = form.email.value;
    const comments = form.comments.value;

    // input validation
    const commentsRegexPattern = /[,.*,\.a-zA-Z0-9]/;

    console.log(`%cUsername: ${userName}`, styles1);
    console.log(`%cEmail: ${email}`, styles2);

    if (commentsRegexPattern.test(comments)) {
        console.log(`%cComments: ${comments}`, styles3);
    } else {
        console.log(`%cYou must provide a valid comment. (only alphabetical characters and (.) and (,) and (-))`, styles3);
    }

});    
