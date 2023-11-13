document.getElementById("btn").addEventListener("submit",showData)



// addexpense.js

// addexpense.js

async function showData(e) {
    e.preventDefault();
    try {
        const result = await axios.get("/user/addExpense");
        renderData(result.data);
    } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
    }
}

function renderData(data) {
    const listContainer = document.getElementById("dataList");
    listContainer.innerHTML = "";

    const list = document.createElement("ul");

    data.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item.description; // Adjust this based on your actual data structure
        list.appendChild(listItem);
    });

    listContainer.appendChild(list);
}




