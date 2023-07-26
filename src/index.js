import './styles/index.css';
import jsonData from './data/state_regex_data.json'

function getMatchRegexes() {
  return jsonData.map(({state, abbr, regexp}) => {
    return {
      state: `${abbr} - ${state}`,
      regexp: regexp.map(reg => new RegExp(`^${reg}$`))
    }
  })
}

function getMatches(rawLicense) {
  // People enter dashes unpredictably, so we just ignore them entirely.
  // They aren't significant, at least for I-9 verification purposes.
  const license = rawLicense.replace('-', '');

  if (license === '') return [];

  const validStates = [];

  const matches = getMatchRegexes();

  for (const match of matches) {
    const {state, regexp} = match;
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

function setup() {
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
