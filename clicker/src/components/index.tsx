import "./styles/index.css";
import { useState, useEffect } from "react";
import 'animate.css';
import swal from 'sweetalert';
import LinearProgress from "@mui/material/LinearProgress";
const FinalBoss = () => {
  const [score, setScore] = useState(0);
  const [lifeBoss, setLifeBoss] = useState(100);
  const [damage, setDamage] = useState(1)
  const [coins, setCoins] = useState(0)
  const [validateButton, setValidateButton] = useState(true)
  const [level2, setLevel2] = useState(false)
  const [bossName, setBossName] = useState('DOCTOR MALITO')
  const [imgBoss, setImgBoss] = useState('https://media.indiedb.com/cache/images/games/1/27/26105/thumb_620x2000/castingBig.gif')
  const informationScore = () => {
    if (!level2) {
      if (lifeBoss !== 0 && lifeBoss > 0) {
        setScore(score + damage);
        setLifeBoss(lifeBoss - damage);
        setCoins(coins + 1);
      }
    } else if (level2) {
      if (lifeBoss !== 0 && lifeBoss > 0) {
        setScore(score + damage);
        setLifeBoss(lifeBoss - damage);
        setCoins(coins + 2);
      }
    }
  };

  useEffect(() => {
    if (level2) {
      if (coins >= 20) {
        setValidateButton(false)
      } else {
        setValidateButton(true)
      }
    } else if (!level2) {
      if (coins >= 10) {
        setValidateButton(false)
      } else {
        setValidateButton(true)
      }
    }
  }, [coins])

  useEffect(() => {
    if (level2) {
      setBossName('¡DOCTOR BRIGIDO!')
    }
  }, [level2])

  useEffect(() => {
    if (Number(lifeBoss) <= 0 && !level2) {
      swal({
        title: "YOU WIN",
        text: "you can choose level 2 now!",
        icon: "success",
        buttons: ["RESTART", "LEVEL 2"],
      }).then((newLevel) => {
        if (newLevel) {
          setLevel2(true)
          configLevel2()
          swal("Welcome to the level 2", {
            icon: "success",
          });
        } else {
          swal("¡LEVEL 1 RESTARTED!");
          setScore(0)
          setLifeBoss(100)
          setDamage(1)
          setCoins(0)
        }
      });
    } else if (Number(lifeBoss) <= 0 && level2) {
      swal({
        title: "YOU WIN",
        text: "you can go back to level 1 now!",
        icon: "success",
        buttons: ["RESTART", "LEVEL 1"],
      }).then((restart) => {
        if (restart) {
          setLevel2(false)
          configLevel1()
          swal("Welcome to the level 1", {
            icon: "success",
          });
        } else {
          swal("¡LEVEL 2 RESTARTED!");
          configLevel2()
        }
      });
    }
  }, [lifeBoss])
  const upgradeDamage = () => {
    setCoins(coins - 10);
    setDamage(damage + 1);
  };

  const configLevel1 = () => {
    setBossName('DOCTOR MALITO')
    setImgBoss('https://media.indiedb.com/cache/images/games/1/27/26105/thumb_620x2000/castingBig.gif')
    setScore(0)
    setLifeBoss(100)
    setDamage(1)
    setCoins(0)
  }

  const configLevel2 = () => {
    setBossName('¡DOCTOR BRIGIDO!')
    setImgBoss('https://i.gifer.com/B0DJ.gif')
    setScore(0)
    setLifeBoss(200)
    setDamage(1)
    setCoins(0)
  }

  return (
    <>
      <div className="container">
        <div className="boss-life">
          <h1>{bossName}</h1>
          <h1>{lifeBoss}%</h1>
          <LinearProgress color="warning" variant="determinate" value={lifeBoss} />
        </div>
        <div className="container-boos" onClick={() => informationScore()}>
          <img
            className="img-boss"
            src={imgBoss}
          /><p>+{damage}</p>
        </div>
        <div className="footer-container">
          <div className="score">
            <p>SCORE</p>
            {score}
          </div>
          <div className="score">
            <p>COINS</p>
            ${coins}
          </div>
          <div className="power-up">
            <p>POWER UP</p>
            <button disabled={validateButton} onClick={upgradeDamage} >DAMAGE+1</button>
          </div>
        </div>
      </div>

    </>
  );
};

export default FinalBoss;
