import "./App.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointRight,
  faQuoteLeft,
  faSearch,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

function Dictionary() {
  //input items
  const [searchItem, setSearchItem] = useState("");

  //search button action
  const [word, setWord] = useState("");
  const handleSearch = () => {
    setWord(searchItem);
  };

  //Api calling
  const [Aud, setAud] = useState();
  //Audio Play start
  const playSound = (audioFile) => {
    audioFile.play();
  };
  //Audio Play end
  const [WordAPI, setWordAPI] = useState("");
  const [Phon, setPhon] = useState("");
  const [Origin, setOrigin] = useState("");

  const [POS, setPOS] = useState([]);
  const [Noun, setNoun] = useState([]);
  const [Pronoun, setPronoun] = useState([]);
  const [Adj, setAdj] = useState([]);
  const [Verb, setVerb] = useState([]);
  const [Adverb, setAdverb] = useState([]);
  const [Prepo, setPrepo] = useState([]);
  const [Conj, setConj] = useState([]);
  const [Inter, setInter] = useState([]);

  const [EH, setEH] = useState(false);
  const [RF, setRF] = useState(false);
  const [NR, setNR] = useState(false);
  const [Err, setErr] = useState("");
  const [Cond, setCond] = useState(false);

  const getWord = async () => {
    try {
      const respose = await fetch(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
      );
      const data = await respose.json();
      if (data.title === "No Definitions Found") {
        setErr(data.message);
        setCond(true);
        setEH(true);
        setNR(false);
        setRF(false);
      } else {
        setCond(false);
        setEH(false);
        const wd = data[0].word;
        const phon = data[0].phonetic;
        const aud = data[0].phonetics[0].audio;
        const meaning = data[0].meanings;
        const source = data[0].origin;

        const pos = [];
        const noun = [];
        const pronoun = [];
        const adjective = [];
        const verb = [];
        const adverb = [];
        const preposition = [];
        const conjunction = [];
        const interjection = [];

        for (var i in meaning) {
          if (meaning[i].partOfSpeech === "noun") {
            pos.push(meaning[i].partOfSpeech);
            for (var j in meaning[i].definitions) {
              noun.push(meaning[i].definitions[j].definition);
              noun.push(meaning[i].definitions[j].example);
            }
          }
          if (meaning[i].partOfSpeech === "pronoun") {
            pos.push(meaning[i].partOfSpeech);
            for (var k in meaning[i].definitions) {
              pronoun.push(meaning[i].definitions[k].definition);
              pronoun.push(meaning[i].definitions[k].example);
            }
          }
          if (meaning[i].partOfSpeech === "verb") {
            pos.push(meaning[i].partOfSpeech);
            for (var m in meaning[i].definitions) {
              verb.push(meaning[i].definitions[m].definition);
              verb.push(meaning[i].definitions[m].example);
            }
          }
          if (meaning[i].partOfSpeech === "adjective") {
            pos.push(meaning[i].partOfSpeech);
            for (var n in meaning[i].definitions) {
              adjective.push(meaning[i].definitions[n].definition);
              adjective.push(meaning[i].definitions[n].example);
            }
          }
          if (meaning[i].partOfSpeech === "adverb") {
            pos.push(meaning[i].partOfSpeech);
            for (var p in meaning[i].definitions) {
              adverb.push(meaning[i].definitions[p].definition);
              adverb.push(meaning[i].definitions[p].example);
            }
          }
          if (meaning[i].partOfSpeech === "preposition") {
            pos.push(meaning[i].partOfSpeech);
            for (var q in meaning[i].definitions) {
              preposition.push(meaning[i].definitions[q].definition);
              preposition.push(meaning[i].definitions[q].example);
            }
          }
          if (meaning[i].partOfSpeech === "conjunction") {
            pos.push(meaning[i].partOfSpeech);
            for (var r in meaning[i].definitions) {
              conjunction.push(meaning[i].definitions[r].definition);
              conjunction.push(meaning[i].definitions[r].example);
            }
          }
          if (meaning[i].partOfSpeech === "interjection") {
            pos.push(meaning[i].partOfSpeech);
            for (var s in meaning[i].definitions) {
              interjection.push(meaning[i].definitions[s].definition);
              interjection.push(meaning[i].definitions[s].example);
            }
          }
        }
        const likeAudio = new Audio(aud);
        setAud(likeAudio);

        setWordAPI(wd);
        setPhon(phon);
        setOrigin(source);

        setPOS(pos);
        setNoun(noun);
        setPronoun(pronoun);
        setAdj(adjective);
        setVerb(verb);
        setAdverb(adverb);
        setPrepo(preposition);
        setConj(conjunction);
        setInter(interjection);
        setNR(false);
        setRF(true);
      }
    } catch (err) {
      console.log("No Found");
      setNR(true);
    }
  };
  useEffect(() => {
    getWord();
    console.log("i am calling");
  }, [word]);

  return (
    <div className="directory-container">
      <div className="search-div">
        <input
          class="searchTerm"
          type="text"
          placeholder="Search english word..."
          onChange={(event) => setSearchItem(event.target.value)}
        />
        <button onClick={handleSearch} class="searchButton">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className="search-output-container">
        <div className={NR ? "result-found" : "no-result-found"}>
          <h1>No result found.</h1>
        </div>
        <div className={RF ? "display:none" : "word-title"}>
          <h1>
            {WordAPI}
            <span>&nbsp;&nbsp;[&nbsp;{Phon}&nbsp;]</span>&nbsp;&nbsp;
            <FontAwesomeIcon
              icon={faVolumeUp}
              onClick={() => playSound(Aud)}
              className="volume-btn"
            />
          </h1>
          <p>
            <strong>Origin:&nbsp;</strong>
            {Origin}
          </p>
          <hr />
        </div>
        {/* Error message */}
        <div>
          <p style={{ textAlign: "justify" }}>{Cond ? Err : ""}</p>
        </div>
        <div
          className={
            EH ? "not-word-defination-container" : "word-defination-container"
          }
        >
          {console.log(EH)}
          {/* Noun */}
          <div className="word-defination">
            <>{POS.map((value) => value === "noun" && <h3>{value}</h3>)}</>
            <>
              {Noun.map((value, index) =>
                index % 2 === 0 ? (
                  <p>
                    <FontAwesomeIcon icon={faHandPointRight} /> &nbsp;&nbsp;
                    {value}
                  </p>
                ) : (
                  <p className="example-text">
                    <FontAwesomeIcon icon={faQuoteLeft} /> &nbsp;&nbsp;
                    {value === undefined ? "No example" : value}
                  </p>
                )
              )}
            </>
          </div>
          {/* Pronoun */}
          <div className="word-defination">
            <>{POS.map((value) => value === "pronoun" && <h3>{value}</h3>)}</>
            <>
              {Pronoun.map((value, index) =>
                index % 2 === 0 ? (
                  <p>
                    <FontAwesomeIcon icon={faHandPointRight} /> &nbsp;&nbsp;
                    {value}
                  </p>
                ) : (
                  <p className="example-text">
                    <FontAwesomeIcon icon={faQuoteLeft} /> &nbsp;&nbsp;
                    {value === undefined ? "No example" : value}
                  </p>
                )
              )}
            </>
          </div>
          {/* adjective */}
          <div className="word-defination">
            <>{POS.map((value) => value === "adjective" && <h3>{value}</h3>)}</>
            <>
              {Adj.map((value, index) =>
                index % 2 === 0 ? (
                  <p>
                    <FontAwesomeIcon icon={faHandPointRight} /> &nbsp;&nbsp;
                    {value}
                  </p>
                ) : (
                  <p className="example-text">
                    <FontAwesomeIcon icon={faQuoteLeft} /> &nbsp;&nbsp;
                    {value === undefined ? "No example" : value}
                  </p>
                )
              )}
            </>
          </div>
          {/* Verb */}
          <div className="word-defination">
            <>{POS.map((value) => value === "verb" && <h3>{value}</h3>)}</>
            <>
              {Verb.map((value, index) =>
                index % 2 === 0 ? (
                  <p>
                    <FontAwesomeIcon icon={faHandPointRight} /> &nbsp;&nbsp;
                    {value}
                  </p>
                ) : (
                  <p className="example-text">
                    <FontAwesomeIcon icon={faQuoteLeft} /> &nbsp;&nbsp;
                    {value === undefined ? "No example" : value}
                  </p>
                )
              )}
            </>
          </div>
          {/* adverb */}
          <div className="word-defination">
            <>{POS.map((value) => value === "adverb" && <h3>{value}</h3>)}</>
            <>
              {Adverb.map((value, index) =>
                index % 2 === 0 ? (
                  <p>
                    <FontAwesomeIcon icon={faHandPointRight} /> &nbsp;&nbsp;
                    {value}
                  </p>
                ) : (
                  <p className="example-text">
                    <FontAwesomeIcon icon={faQuoteLeft} /> &nbsp;&nbsp;
                    {value === undefined ? "No example" : value}
                  </p>
                )
              )}
            </>
          </div>
          {/* preposition */}
          <div className="word-defination">
            <>
              {POS.map((value) => value === "preposition" && <h3>{value}</h3>)}
            </>
            <>
              {Prepo.map((value, index) =>
                index % 2 === 0 ? (
                  <p>
                    <FontAwesomeIcon icon={faHandPointRight} /> &nbsp;&nbsp;
                    {value}
                  </p>
                ) : (
                  <p className="example-text">
                    <FontAwesomeIcon icon={faQuoteLeft} /> &nbsp;&nbsp;
                    {value === undefined ? "No example" : value}
                  </p>
                )
              )}
            </>
          </div>
          {/* conjunction */}
          <div className="word-defination">
            <>
              {POS.map((value) => value === "conjunction" && <h3>{value}</h3>)}
            </>
            <>
              {Conj.map((value, index) =>
                index % 2 === 0 ? (
                  <p>
                    <FontAwesomeIcon icon={faHandPointRight} /> &nbsp;&nbsp;
                    {value}
                  </p>
                ) : (
                  <p className="example-text">
                    <FontAwesomeIcon icon={faQuoteLeft} /> &nbsp;&nbsp;
                    {value === undefined ? "No example" : value}
                  </p>
                )
              )}
            </>
          </div>
          {/* interjection */}
          <div className="word-defination">
            <>
              {POS.map((value) => value === "interjection" && <h3>{value}</h3>)}
            </>
            <>
              {Inter.map((value, index) =>
                index % 2 === 0 ? (
                  <p>
                    <FontAwesomeIcon icon={faHandPointRight} /> &nbsp;&nbsp;
                    {value}
                  </p>
                ) : (
                  <p className="example-text">
                    <FontAwesomeIcon icon={faQuoteLeft} /> &nbsp;&nbsp;
                    {value === undefined ? "No example" : value}
                  </p>
                )
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dictionary;
