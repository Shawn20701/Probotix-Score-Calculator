const Totals = JSON.parse(localStorage.getItem("Totals") || "[]");
const Compare_Value = JSON.parse(localStorage.getItem("Compare_Value") || "{}");
updateRecent();

function updateRecent() {
  const Totals_Element = document.getElementById("Recent_Totals");
  if (!Totals_Element) return;

  Totals_Element.innerHTML = Totals
    .slice(-5)
    .map(item => `${item.team}, ${item.score}`)
    .join(", ");
}
function SubmitForm(){
const form = document.getElementById('Main_Form');
const Door_Value = Number(form.elements['Num_of_Door'].value);
var Door_Points = Door_Value * 1;
const Obstacle_Value = Number(form.elements['Times_Course_Completed'].value);
var Obstacle_Points = Obstacle_Value * 10;
const Obstacle_Penalties = Number(form.elements['Times_Obstacles_Hit'].value);
var Obstacle_Penalties_points = Obstacle_Penalties * 2
const Block_Value = Number(form.elements['Blocks_Pushed'].value);
var Block_Points = Block_Value * 2;
const Block_Bonus = Number(form.elements['Bonus'].value);
var Block_Bonus_Points = Block_Bonus * 2;
const Pixel_Value = Number(form.elements['Pixels_Sorted'].value);
var Pixel_Points = Pixel_Value * 5;
const Hill_Value = Number(form.elements['Ducks_Push_Up_Hill'].value);
var Hill_Points = Hill_Value * 10;
const Major_Value = Number(form.elements['Major_Penalties'].value);
const Minor_Value = Number(form.elements['Minor_Penalties'].value);
var Major_Points = Major_Value * 5;
var Minor_Points = Minor_Value * 3;
var Total = Door_Points + Obstacle_Points - Obstacle_Penalties_points + Block_Points + Block_Bonus_Points + Pixel_Points + Hill_Points - Major_Points - Minor_Points;
console.log(Total);
document.getElementById("Form_Output").innerHTML = Total;
const team = document.querySelector('input[name="Team"]:checked')?.value;
Totals.push({ team, score: Total });
console.log(Totals);
  Compare_Value[team] = { score: Total, date: new Date() };
  if (Object.keys(Compare_Value).length > 2) {
    const oldestTeam = Object.keys(Compare_Value).reduce((oldest, team) => {
      return Compare_Value[team].date < Compare_Value[oldest].date ? team : oldest;
    });
    delete Compare_Value[oldestTeam];
  }
localStorage.setItem("Compare_Value", JSON.stringify(Compare_Value));
localStorage.setItem("Totals", JSON.stringify(Totals));
updateRecent();
}
function CompareScores(){
  const red = Compare_Value['Red'];
  const blue = Compare_Value['Blue'];
  var win = document.getElementById("Winner");
  var redpoints = red.score;
  var bluepoints = blue.score;
  if (redpoints >  bluepoints){

    console.log("Red wins");
    win.innerHTML = "Red";
  }
  else if (bluepoints > redpoints){
     console.log("Blue wins");
     win.innerHTML = "Blue";
  }
  else {
    console.log("error!");
    win.innerHTML = "Error";
  }
  console.log(bluepoints,redpoints);
}
function Clear(){
    localStorage.setItem("Totals", JSON.stringify([]));
    Totals.length = 0;
    updateRecent();
}