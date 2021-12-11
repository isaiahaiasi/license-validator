let matches = [];

async function setMatchData() {
  json = await fetch('out.json').then(res => {
    if (!res.ok) {
      throw new Error("Error fetching matcher data!");
    }

    return res.json()
  });

  matches = json.map(({ state, abbr, regexp }) => {
    return {
      state: `${abbr} - ${state}`,
      regexp: regexp.map(reg => new RegExp(`^${reg}$`))
    }
  })
}

function getMatches(license) {
  if (license === '') return [];

  const validStates = [];

  for (const match of matches) {
    const { state, regexp } = match;
    for (const rg of regexp) {
      if (license.match(rg, 1)) {
        validStates.push(state);
      }
    }
  }

  return validStates;
}

function renderList(matches) {
  const listEle = document.querySelector('#state-list');

  listEle.innerHTML = "";

  for (const match of matches) {
    const li = document.createElement('li');
    li.classList.add("card");
    li.textContent = match;
    listEle.append(li)
  }
}

async function setup() {
  await setMatchData();

  const input = document.querySelector("#dl-number-input");

  input.addEventListener("input", (e) => {
    const matches = getMatches(e.currentTarget.value);
    renderList(matches);
    if (matches.length === 0) {
      document.querySelector("#warning").classList.remove('hidden');
    } else {
      document.querySelector("#warning").classList.add('hidden');
    }
  });
}

setup();
