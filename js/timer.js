let m = s = 0;

// Return Time
function getTime() {
	return (m < 10 ? '0' + m : m) +':'+(s < 10 ? '0' + s : s);
}
// Timer Tick
function tickTime(){
	s++;
	s > 59 ? (m++, s=0) : false;
}
