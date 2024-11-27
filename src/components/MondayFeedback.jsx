import React from "react";
import axios from "axios";

const AccessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ0MTA5MzE5NCwiYWFpIjoxMSwidWlkIjo2ODk2NTAzNSwiaWFkIjoiMjAyNC0xMS0yNVQyMDoyMDozNC43MzRaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjY2ODE3NjEsInJnbiI6ImV1YzEifQ.PjIQyDgYU_wg2AAJeafeiIa_tb8K-c0ZiIerGBEYsfM";
const boardID = "1718995144";

const data = {
  user: "John Doe",
  date: "1993-08-27",
  title: "This is feedback",
  url: "http://google.com",
  platform: "Testing platform",
  // rating: "Positive",
  comments: "This is positive feedback",
  language: "en",
  gitIssue: "https://github.com/TalhaZulfiqar69/blof-frontend",
  status: "Negative",
};
const MondayFeedback = () => {
  const saveFeedbackToMonday = async (feedbackData) => {
    const {
      user,
      date,
      title,
      url,
      platform,
      // rating,
      comments,
      language,
      gitIssue,
      status,
    } = feedbackData;

    if (isNaN(new Date(date))) {
      console.error("Invalid date value:", date);
      return;
    }

    const formattedDate = new Date(date).toISOString().split("T")[0];
    const columnValues = JSON.stringify({
      text1__1: user,
      date__1: formattedDate,
      text91__1: title,
      url__1: url,
      text__1: platform,
      // text4__1: rating,
      text5__1: comments,
      text0__1: gitIssue,
      text9__1: language,
      status_1__1: status,
    });
    try {
      const response = await axios.post(
        "https://api.monday.com/v2",
        {
          query: `
            mutation {
              create_item (
                board_id: "${boardID}",
                item_name: "Feedback",
                column_values: "${columnValues.replace(/"/g, '\\"')}"
              ) {
                id
              }
            }
          `,
        },
        {
          headers: {
            Authorization: AccessToken,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Feedback saved:", response.data);
    } catch (error) {
      console.error(
        "Error saving feedback:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div>
      <button onClick={() => saveFeedbackToMonday(data)}>Send Feedback</button>
    </div>
  );
};

export default MondayFeedback;

// try {
//   const response = await axios.post(
//     "https://api.monday.com/v2",
//     {
//       query: `
//         mutation {
//           create_item (
//             board_id: "${boardID}",
//             item_name: "feedback",
//             column_values: "{
//               \\"project_owner\\": \\"${user}\\",
//               \\"date__1\\": \\"${formattedDate}\\",
//               \\"project_status\\": \\"${title}\\",
//               \\"link__1\\": \\"${url}\\",
//               \\"text__1\\": \\"${platform}\\",
//               \\"text9__1\\": \\"${language}\\",
//               \\"status__1\\": \\"${rating}\\",
//               \\"text5__1\\": \\"${comments}\\",
//               \\"text0__1\\": \\"${gitIssue}\\"
//             }"
//           ) {
//             id
//           }
//         }
//       `,
//     },
//     {
//       headers: {
//         Authorization: AccessToken, //"YOUR_API_TOKEN",
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   console.log("Feedback saved:", response.data);
// } catch (error) {
//   console.error("Error saving feedback:", error);
// }
