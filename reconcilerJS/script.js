function createDomElements(data) { var parentElement = document.getElementById("mainArea");
  parentElement.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    var childElement = document.createElement("div");

    var grandChildElement1 = document.createElement("span");
    grandChildElement1.innerHTML = data[i].title;

    var grandChildElement2 = document.createElement("span");
    grandChildElement2.innerHTML = data[i].description;

    var grandChildElement3 = document.createElement("button");
    grandChildElement3.innerHTML = "Delete";
    grandChildElement3.setAttribute(
      "onclick",
      "deleteTodo(" + data[i].id + ")"
    );

    childElement.appendChild(grandChildElement1);
    childElement.appendChild(grandChildElement2);
    childElement.appendChild(grandChildElement3);
    parentElement.appendChild(childElement);
  }
}

window.setInterval(() => {
  let todos = [];
  for (let i = 1; i < Math.floor(Math.random() * 100); i++) {
    let j = i;
    todos.push({ id: j, title: "Todo" + j, description: "description" + j });
  }
  createDomElements(todos);
}, 1000);
