const matches = {
    // TODO: generate list from
    // https://success.myshn.net/Policy/Data_Identifiers/U.S._Driver%27s_License_Numbers
    // in the form of:
    // "AZ - Arizona": [ reg1, reg2 ]
    // (this isn't super efficient b/c it means redundant matches, but it IS easy :P)
}

function getMatches(license) {
    if (license === '') return;

}

function renderList(matches) {
    const listEle = document.querySelector('#state-list');

    for(const match of matches) {
        const li = document.createElement('li');
        li.textContent = match;
        listEle.append(li)
    }
}

function setup() {
    const input = document.querySelector("#dl-number-input");
    input.addEventListener("onChange", (e) => {
        const matches = getMatches(e.currentTarget.value);
        renderList(matches);
    });
}

setup();
