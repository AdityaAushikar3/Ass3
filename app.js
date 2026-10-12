// Array to store student records
let students = [];

// Form submit event to add a student
document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Read input values
  let rollNo = document.getElementById("rollNo").value.trim();
  let name = document.getElementById("name").value.trim();
  let sub1 = Number(document.getElementById("sub1").value);
  let sub2 = Number(document.getElementById("sub2").value);
  let sub3 = Number(document.getElementById("sub3").value);
  let sub4 = Number(document.getElementById("sub4").value);
  let sub5 = Number(document.getElementById("sub5").value);

  // Check for duplicate roll number
  for (let i = 0; i < students.length; i++) {
    if (students[i].rollNo.toLowerCase() === rollNo.toLowerCase()) {
      alert("A student with Roll Number " + rollNo + " already exists!");
      return;
    }
  }

  // Calculate Total and Percentage
  let total = sub1 + sub2 + sub3 + sub4 + sub5;
  let percentage = total / 5;

  // Calculate Grade
  let grade = "F";
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 40) grade = "D";

  // Create student object
  let student = {
    rollNo: rollNo,
    name: name,
    sub1: sub1,
    sub2: sub2,
    sub3: sub3,
    sub4: sub4,
    sub5: sub5,
    total: total,
    percentage: percentage,
    grade: grade
  };

  // Add to array
  students.push(student);

  // Update table and topper
  updateTable();

  // Reset form
  document.getElementById("studentForm").reset();
  document.getElementById("rollNo").focus();
});

// Function to update the table and find the topper
function updateTable() {
  let tableBody = document.getElementById("tableBody");
  let topperDisplay = document.getElementById("topperDisplay");

  tableBody.innerHTML = "";

  // If no records
  if (students.length === 0) {
    topperDisplay.innerText = "No records added yet.";
    tableBody.innerHTML = "<tr><td colspan='11'>No student records added.</td></tr>";
    return;
  }

  // Find Topper (highest percentage)
  let topper = students[0];
  for (let i = 1; i < students.length; i++) {
    if (students[i].percentage > topper.percentage) {
      topper = students[i];
    }
  }

  // Display Topper info
  topperDisplay.innerHTML = "<strong>" + topper.name + "</strong> (Roll No: " + topper.rollNo + ") - Total: <strong>" + topper.total + "/500</strong>, Percentage: <strong>" + topper.percentage.toFixed(2) + "%</strong>, Grade: <strong>" + topper.grade + "</strong>";

  // Add each student to the table
  for (let i = 0; i < students.length; i++) {
    let s = students[i];
    let isTopper = (s.rollNo === topper.rollNo && s.percentage === topper.percentage);

    let row = document.createElement("tr");
    if (isTopper) {
      row.className = "topper-row";
    }

    row.innerHTML =
      "<td>" + s.rollNo + "</td>" +
      "<td>" + s.name + (isTopper ? " (Topper)" : "") + "</td>" +
      "<td>" + s.sub1 + "</td>" +
      "<td>" + s.sub2 + "</td>" +
      "<td>" + s.sub3 + "</td>" +
      "<td>" + s.sub4 + "</td>" +
      "<td>" + s.sub5 + "</td>" +
      "<td>" + s.total + "</td>" +
      "<td>" + s.percentage.toFixed(2) + "%</td>" +
      "<td>" + s.grade + "</td>" +
      "<td><button type='button' class='delete-btn' onclick='deleteStudent(" + i + ")'>Delete</button></td>";

    tableBody.appendChild(row);
  }
}

// Function to delete student record
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    updateTable();
  }
}

// Initial display on page load
updateTable();
