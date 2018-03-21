const TL = TweenLite; // eslint-disable-line
const moveDuration = .5

export default {
	moveLeftRight(target, option, callBack) {
		return TL.to(target, moveDuration, option)
	},
	moveUpDown(target, option, callBack) {
		return TL.to(target, moveDuration, option)
	},
	bloomToFocused() {

	},
	bloomToLarge() {

	},
	bloomBackToBase() {

	}

}