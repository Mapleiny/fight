define(function() {
	var Load = function() {

	};

	Load.prototype = {
		sourceAndRule : {
			source: {
				'groups': {
					'body': {
						'name': '00002000.img',
						'src': './images/charater/00002000.img.png',
						'width': 806,
						'height': 250
					}
				},
				'data': {
					'walk1.0.arm.png': {
						'x': 129,
						'y': 218,
						'width': 12,
						'height': 17
					},
					'walk1.0.body.png': {
						'x': 141,
						'y': 218,
						'width': 27,
						'height': 32
					},
					'walk1.1.arm.png': {
						'x': 168,
						'y': 218,
						'width': 13,
						'height': 17
					},
					'walk1.1.body.png': {
						'x': 181,
						'y': 218,
						'width': 26,
						'height': 32
					},
					'walk1.2.arm.png': {
						'x': 207,
						'y': 218,
						'width': 12,
						'height': 17
					},
					'walk1.2.body.png': {
						'x': 219,
						'y': 218,
						'width': 24,
						'height': 32
					},
					'walk1.3.arm.png': {
						'x': 243,
						'y': 218,
						'width': 14,
						'height': 15
					},
					'walk1.3.body.png': {
						'x': 257,
						'y': 218,
						'width': 29,
						'height': 31
					}
				}
			},
			rule: {
				'unitId': {
					'walk1': {
						'0': {
							'body': {
								'src': 'walk1.0.body.png',
								'origin': '19,32',
								'map': {
									'neck': '-4,-32',
									'navel': '-6,-20'
								},
								'z': 'body',
								'group': 'body'
							},
							'arm': {
								'src': 'walk1.0.arm.png',
								'origin': '6,8',
								'map': {
									'navel': '-12,2',
									'hand': '1,5'
								},
								'z': 'arm',
								'group': 'body'
							}
						},
						'1': {
							'body': {
								'src': 'walk1.1.body.png',
								'origin': '16,32',
								'map': {
									'neck': '-4,-31',
									'navel': '-6,-20'
								},
								'z': 'body',
								'group': 'body'
							},
							'arm': {
								'src': 'walk1.1.arm.png',
								'origin': '6,9',
								'map': {
									'navel': '-6,-1',
									'hand': '-2,5'
								},
								'z': 'arm',
								'group': 'body'
							}
						},
						'2': {
							'body': {
								'src': 'walk1.2.body.png',
								'origin': '19,32',
								'map': {
									'neck': '-4,-32',
									'navel': '-6,-20'
								},
								'z': 'body',
								'group': 'body'
							},
							'arm': {
								'src': 'walk1.2.arm.png',
								'origin': '6,8',
								'map': {
									'navel': '-12,2',
									'hand': '1,6'
								},
								'z': 'arm',
								'group': 'body'
							}
						},
						'3': {
							'body': {
								'src': 'walk1.3.body.png',
								'origin': '21,31',
								'map': {
									'neck': '-4,-31',
									'navel': '-6,-18'
								},
								'z': 'body',
								'group': 'body'
							},
							'arm': {
								'src': 'walk1.3.arm.png',
								'origin': '7,7',
								'map': {
									'navel': '-13,4',
									'hand': '3,5'
								},
								'z': 'arm',
								'group': 'body'
							}
						}
					}
				}
			},
			zmap: {
				'mobEquipFront': 0,
				'tamingMobFront': 1,
				'mobEquipMid': 2,
				'saddleFront': 3,
				'mobEquipUnderSaddle': 4,
				'tamingMobMid': 5,
				'characterStart': 6,
				'emotionOverBody': 7,
				'weaponWristOverGlove': 8,
				'capeOverHead': 9,
				'weaponOverGlove': 10,
				'gloveWristOverHair': 11,
				'gloveOverHair': 12,
				'handOverHair': 13,
				'weaponOverHand': 14,
				'shieldOverHair': 15,
				'gloveWristBelowWeapon': 16,
				'gloveBelowWeapon': 17,
				'handBelowWeapon': 18,
				'weaponOverArm': 19,
				'gloveWristBelowMailArm': 20,
				'mailArmOverHair': 21,
				'gloveBelowMailArm': 22,
				'armOverHair': 23,
				'mailArmOverHairBelowWeapon': 24,
				'armOverHairBelowWeapon': 25,
				'weaponBelowArm': 26,
				'capOverHair': 27,
				'accessoryEarOverHair': 28,
				'accessoryOverHair': 29,
				'hairOverHead': 30,
				'accessoryEyeOverCap': 31,
				'capAccessory': 32,
				'cap': 33,
				'hair': 34,
				'accessoryEye': 35,
				'accessoryEyeShadow': 36,
				'accessoryFace': 37,
				'capAccessoryBelowAccFace': 38,
				'accessoryEar': 39,
				'capBelowAccessory': 40,
				'accessoryFaceOverFaceBelowCap': 41,
				'face': 42,
				'accessoryEyeBelowFace': 43,
				'accessoryFaceBelowFace': 44,
				'hairShade': 45,
				'head': 46,
				'cape': 47,
				'gloveWrist': 48,
				'mailArm': 49,
				'glove': 50,
				'hand': 51,
				'arm': 52,
				'weapon': 53,
				'shield': 54,
				'weaponOverArmBelowHead': 55,
				'gloveWristBelowHead': 56,
				'mailArmBelowHeadOverMailChest': 57,
				'gloveBelowHead': 58,
				'armBelowHeadOverMailChest': 59,
				'mailArmBelowHead': 60,
				'armBelowHead': 61,
				'weaponOverBody': 62,
				'mailChestTop': 63,
				'gloveWristOverBody': 64,
				'mailChestOverHighest': 65,
				'pantsOverMailChest': 66,
				'mailChest': 67,
				'shoesTop': 68,
				'pantsOverShoesBelowMailChest': 69,
				'shoesOverPants': 70,
				'mailChestOverPants': 71,
				'pants': 72,
				'shoes': 73,
				'pantsBelowShoes': 74,
				'mailChestBelowPants': 75,
				'gloveOverBody': 76,
				'body': 77,
				'gloveWristBelowBody': 78,
				'gloveBelowBody': 79,
				'capAccessoryBelowBody': 80,
				'shieldBelowBody': 81,
				'capeBelowBody': 82,
				'hairBelowBody': 83,
				'weaponBelowBody': 84,
				'backHairOverCape': 85,
				'backWing': 86,
				'backWeaponOverShield': 87,
				'backShield': 88,
				'backCapOverHair': 89,
				'backHair': 90,
				'backCap': 91,
				'backWeaponOverHead': 92,
				'backHairBelowCapWide': 93,
				'backHairBelowCapNarrow': 94,
				'backHairBelowCap': 95,
				'backCape': 96,
				'backAccessoryOverHead': 97,
				'backAccessoryFaceOverHead': 98,
				'backHead': 99,
				'backMailChestOverPants': 100,
				'backPantsOverMailChest': 101,
				'backMailChest': 102,
				'backPantsOverShoesBelowMailChest': 103,
				'backShoes': 104,
				'backPants': 105,
				'backShoesBelowPants': 106,
				'backPantsBelowShoes': 107,
				'backMailChestBelowPants': 108,
				'backWeaponOverGlove': 109,
				'backGloveWrist': 110,
				'backGlove': 111,
				'backBody': 112,
				'backAccessoryEar': 113,
				'backAccessoryFace': 114,
				'backCapAccessory': 115,
				'backMailChestAccessory': 116,
				'backShieldBelowBody': 117,
				'backHairBelowHead': 118,
				'backWeapon': 119,
				'characterEnd': 120,
				'saddleRear': 121,
				'tamingMobRear': 122,
				'mobEquipRear': 123,
				'backMobEquipFront': 124,
				'backTamingMobFront': 125,
				'backMobEquipMid': 126,
				'backSaddle': 127,
				'backMobEquipUnderSaddle': 128,
				'backTamingMobMid': 129,
				'Sd': 130,
				'Tm': 131,
				'Sr': 132,
				'Wg': 133,
				'Ma': 134,
				'Ws': 135,
				'Pn': 136,
				'So': 137,
				'Si': 138,
				'Wp': 139,
				'Gv': 140,
				'Ri': 141,
				'Cp': 142,
				'Ay': 143,
				'As': 144,
				'Ae': 145,
				'Am': 146,
				'Af': 147,
				'At': 148,
				'Fc': 149,
				'Hr': 150,
				'Hd': 151,
				'Bd': 152
			}
		},
		ready: function(fn) {
			var _this = this,
				imageSrc = _this.getLoadSource(),
				i, sum, count = 0;
			for (i = 0, sum = imageSrc.length; i < sum; ++i) {
				(function(imgInfo) {
					var img = new Image();
					img.onload = function() {
						++count;

						if (count == sum) {
							fn(_this.sourceAndRule);
						}
						img = null;
					};
					_this.sourceAndRule['source']['groups'][imgInfo.key].src = img;
					img.src = imgInfo.src;

				})(imageSrc[i]);
			}

		},
		getLoadSource: function() {
			var _this = this,
				key,
				groups = _this.sourceAndRule['source']['groups'],
				imageSrc = [];

			for (key in groups) {
				imageSrc.push({
					'key' : key,
					'src' : groups[key].src
				});
			}
			return imageSrc;
		}
	};


	return Load;
});