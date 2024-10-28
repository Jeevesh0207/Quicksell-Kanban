// Function to get initials from a name
function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0].toUpperCase())
    .join("");
}

function groupAndSortTickets(tickets, users, groupby, orderby) {
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = { name: user.name, initials: getInitials(user.name) };
    return acc;
  }, {});

  const priorityLabels = {
    0: "No priority",
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
  };
  const priorityOrder = ["No priority", "Urgent", "High", "Medium", "Low"];

  let groupedTickets = {};

  if (groupby === "Status") {
    const validStatuses = [
      "Backlog",
      "Todo",
      "In progress",
      "Done",
      "Canceled",
    ];
    groupedTickets = validStatuses.reduce((acc, status) => {
      acc[status] = tickets
        .filter((ticket) => ticket.status === status)
        .map((ticket) => ({
          ...ticket,
          userInitials: userMap[ticket.userId].initials,
        }));
      return acc;
    }, {});
  } else if (groupby === "Users") {
    groupedTickets = tickets.reduce((acc, ticket) => {
      const userInfo = userMap[ticket.userId];
      const userName = userInfo.name;
      (acc[userName] = acc[userName] || []).push({
        ...ticket,
        userInitials: userInfo.initials,
      });
      return acc;
    }, {});
  } else if (groupby === "Priority") {
    groupedTickets = priorityOrder.reduce((acc, label) => {
      acc[label] = [];
      return acc;
    }, {});

    tickets.forEach((ticket) => {
      const priorityLabel = priorityLabels[ticket.priority];
      const userInitials = userMap[ticket.userId].initials;
      groupedTickets[priorityLabel].push({ ...ticket, userInitials });
    });
  }

  Object.keys(groupedTickets).forEach((key) => {
    groupedTickets[key].sort((a, b) => {
      if (orderby === "Priority") {
        return b.priority - a.priority;
      } else if (orderby === "Title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  });

  return groupedTickets;
}

export default groupAndSortTickets;
