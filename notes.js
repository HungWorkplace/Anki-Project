// choose field inputs
const showFields = () => {
  const contextListEl = document.getElementById("context-list");
  contextListEl.classList.toggle("hidden");
};

const addField = () => {
  const fillContextEl = document.getElementById("fill-context");
  const checkboxes = document.querySelectorAll('input[name="context"]:checked');

  let content = "";
  checkboxes.forEach((checked) => {
    const label = document.querySelector('label[for="' + checked.id + '"]');

    content = content + label.textContent + ", ";
  });

  fillContextEl.textContent = content === "" ? "Select some fields" : content;
};

// Show/hide form
const onpenForm = () => {
  const formModel = document.getElementById("form-model");
  formModel.classList.toggle("hidden");
};

const closeForm = (event) => {
  event.preventDefault();
  const formModel = document.getElementById("form-model");
  formModel.classList.toggle("hidden");
};

// Submit form
const submitStudyHanlder = async (event) => {
  event.preventDefault();

  const loading = document.getElementById("loading");
  loading.classList.toggle("hidden");

  const checkboxes = document.querySelectorAll('input[name="context"]:checked');

  const contextList = [];

  checkboxes.forEach((checked) => {
    const label = document.querySelector('label[for="' + checked.id + '"]');
    contextList.push(`[${label.textContent}] ${checked.value}`);
  });

  const title = document.getElementById("title");
  const description = document.getElementById("description");

  const studyNote = {
    fields: contextList || [],
    title: title.value || "",
    description: description.value || "",
  };

  try {
    const response = await fetch(
      "https://anki-note-4d38f-default-rtdb.asia-southeast1.firebasedatabase.app/notes.json",
      {
        method: "POST",
        body: JSON.stringify(studyNote),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const formModel = document.getElementById("form-model");
      formModel.classList.toggle("hidden");
    }
    // const data = await response.json();
  } catch (e) {
    const errorMessageEl = document.getElementById("error-message");
    errorMessageEl.classList.remove("hidden");

    loading.classList.toggle("hidden");
  }
};
