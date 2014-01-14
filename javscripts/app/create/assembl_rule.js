define(function(){
	var unit = {};


	unit.character = {
		alert : {
			init : {
				height : 39,
				width : 40
			},'0' : {
				body : {
					shiftX : 0,
					shiftY : 2
				},arm : {
					shiftX : 20,
					shiftY : 6
				},lHand : {
					shiftX : 8,
					shiftY : 14
				},rHand : {
					shiftX : 16,
					shiftY : 16
				},
			},'1' : {
				body : {
					shiftX : -1,
					shiftY : 0
				},arm : {
					shiftX : 19,
					shiftY : 6
				},lHand : {
					shiftX : 8,
					shiftY : 13
				},rHand : {
					shiftX : 16,
					shiftY : 15
				},
			},'2' : {
				body : {
					shiftX : -1,
					shiftY : 0
				},arm : {
					shiftX : 20,
					shiftY : 5
				},lHand : {
					shiftX : 9,
					shiftY : 12
				},rHand : {
					shiftX : 17,
					shiftY : 13
				},
			}
		},shoot1 : {
			init : {
				height : 50,
				width : 44
			},'0' : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 18,
					shiftY : -3
				}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
			},'1' : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 31,
					shiftY : -1
				}	
			}
		},shoot2 : {
			init : {
				width : 49,
				height : 42
			},'0' : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 22,
					shiftY : 4
				}
			},'1' : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 9,
					shiftY : -3
				}
			},'2' : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 15,
					shiftY : 0
				}
			},'3' : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 22,
					shiftY : 4
				}
			},'4' : {
				body : {
					shiftX : 2,
					shiftY : 1
				},arm : {
					shiftX : 25,
					shiftY : 5
				}
			}
		},shootF : {
			init : {
				width : 53,
				height : 48
			},'0' : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 22,
					shiftY : 0
				}
			},'1' : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 31,
					shiftY : 3
				}
			}
		},sit : {
			init : {
				width : 38,
				height : 34
			},'0' : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 17,
					shiftY : 5
				}
			}
		},stabO1 : {
			init : {
				width : 64,
				height : 43
			},'0' : {
				body : {
					shiftX : 12,
					shiftY : 0
				},arm : {
					shiftX : 42,
					shiftY : 8
				}
			},'1' : {
				body : {
					shiftX : 19,
					shiftY : 4
				},arm : {
					shiftX : 2,
					shiftY : 5
				}
			}
		},stabO2 : {
			init : {
				widht : 62,
				height : 45
			},'0' : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 33,
					shiftY : 1
				}
			},'1' : {
				body : {
					shiftX : 17,
					shiftY : 6
				},arm : {
					shiftX : 2,
					shiftY : 6
				}
			}
		},stabOF : {
			init : {
				width : 62,
				height : 53
			},'0' : {
				body : {
					shiftX : 22,
					shiftY : 18
				},arm : {
					shiftX : 34,
					shiftY : 20
				}
			},'1' : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 34,
					shiftY : 15
				}
			},'2' : {
				body : {
					shiftX : 5,
					shiftY : 7
				},arm : {
					shiftX : 7,
					shiftY : 10
				}
			}
		},stabT1 : {
			init : {
				width : 70,
				height : 47
			},'0' : {
				body : {
					shiftX : 19,
					shiftY : 7
				},arm : {
					shiftX : 40,
					shiftY : 5
				},hand : {
					shiftX : 35,
					shiftY : 20
				}
			},'1' : {
				body : {
					shiftX : 19,
					shiftY : 8
				},arm : {
					shiftX : 31,
					shiftY : 8
				},hand : {
					shiftX : 23,
					shiftY : 22
				}
			},'2' : {
				body : {
					shiftX : 7,
					shiftY : 0
				},arm : {
					shiftX : 31,
					shiftY : 14
				},hand : {
					shiftX : 8,
					shiftY : 20
				}
			}
		},stabT2 : {
			init : {
				width : 65,
				height : 47
			},'0' : {
				body : {
					shiftX : 14,
					shiftY : 5
				},arm : {
					shiftX : 34,
					shiftY : 8
				},hand : {
					shiftX : 15,
					shiftY : 17
				}
			},'1' : {
				body : {
					shiftX : 11,
					shiftY : 7
				},arm : {
					shiftX : 23,
					shiftY : 7
				},hand : {
					shiftX : 7,
					shiftY : 22
				}
			},'2' : {
				body : {
					shiftX : 5,
					shiftY : 0
				},arm : {
					shiftX : 29,
					shiftY : 16
				},hand : {
					shiftX : 0,
					shiftY : 18
				}
			}
		},stabTF : {
		// 可能缺少图片
			init : {
				width : 0,
				height : 0
			},"2" : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 26,
					shiftY : -6
				},armOverHair : {
					shiftX : 18,
					shiftY : 0
				}
			}
		},stand1 : {
			init : {
				width : 39,
				height : 40
			},"0" : {
				body : {
					shiftX : 2,
					shiftY : 1
				},arm : {
					shiftX : 19,
					shiftY : 4
				}
			},"1" : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 20,
					shiftY : 4
				}
			},"2" : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 21,
					shiftY : 4
				}
			}
		},stand2 : {
			init : {
				width : 36,
				height : 38
			},"0" : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 18,
					shiftY : 4
				},hand : {
					shiftX : 5,
					shiftY : 3
				}
			},"1" : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 18,
					shiftY : 4
				},hand : {
					shiftX : 5,
					shiftY : 4
				}
			},"2" : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 19,
					shiftY : 4
				},hand : {
					shiftX : 6,
					shiftY : 4
				}
			}
		},swingO1 : {
			init : {
				width : 61,
				height : 48
			},"0" : {
				body : {
					shiftX : 6,
					shiftY : 11
				},arm : {
					shiftX : 7,
					shiftY : 18
				}
			},"1" : {
				body : {
					shiftX : 3,
					shiftY : 10
				},arm : {
					shiftX : -1,
					shiftY : 14
				}
			},"2" : {
				body : {
					shiftX : 5,
					shiftY : 7
				},arm : {
					shiftX : 18,
					shiftY : -5
				}
			}
		},swingO2 : {
			init : {
				width : 54,
				height : 46
			},"0" : {
				body : {
					shiftX : 7,
					shiftY : 6
				},arm : {
					shiftX : 8,
					shiftY : -4
				}
			},"1" : {
				body : {
					shiftX : 9,
					shiftY : 5
				},arm : {
					shiftX : 8,
					shiftY : -1
				}
			},"2" : {
				body : {
					shiftX : 3,
					shiftY : 3
				},arm : {
					shiftX : 29,
					shiftY : 9
				}
			}
		},swingO3 : {
			init : {
				width : 71,
				height : 46
			},"0" : {
				body : {
					shiftX : 11,
					shiftY : 0
				},arm : {
					shiftX : 43,
					shiftY : 1
				}
			},"1" : {
				body : {
					shiftX : 14,
					shiftY : 7
				},arm : {
					shiftX : 1,
					shiftY : 6
				}
			},"2" : {
				body : {
					shiftX : 9,
					shiftY : 8
				},arm : {
					shiftX : 10,
					shiftY : 15
				}
			}
		},swingOF : {
			init : {
				width : 55,
				height : 56
			},"0" : {
				body : {
					shiftX : 5,
					shiftY : 14
				},arm : {
					shiftX : 39,
					shiftY : 21
				}
			},"1" : {
				body : {
					shiftX : 0,
					shiftY : 0
				}
			},"2" : {
				body : {
					shiftX : 0,
					shiftY : 0
				}
			},"3" : {
				body : {
					shiftX : 5,
					shiftY : 10
				},arm : {
					shiftX : 2,
					shiftY : 29
				}
			}
		},swingP1 : {
			init : {
				width : 58,
				height : 61
			},"0" : {
				body : {
					shiftX : 6,
					shiftY : 19
				},arm : {
					shiftX : 13,
					shiftY : 2
				},armOverHair : {
					shiftX : 25,
					shiftY : 0
				}
			},"1" : {
				body : {
					shiftX : -3,
					shiftY : 13
				},arm : {
					shiftX : 7,
					shiftY : 5
				}
			},"2" : {
				body : {
					shiftX : 8,
					shiftY : 15
				},arm : {
					shiftX : 3,
					shiftY : 25
				}
			}
		},swingP2 : {
			init : {
				width : 56,
				height : 55
			},"0" : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 8,
					shiftY : 7
				}
			},"1" : {
				body : {
					shiftX : -5,
					shiftY : 1
				},arm : {
					shiftX : 5,
					shiftY : 13
				}
			},"2" : {
				body : {
					shiftX : 10,
					shiftY : 13
				},arm : {
					shiftX : 14,
					shiftY : 20
				}
			}
		},swingPF : {
			init : {
				width : 60,
				height : 72
			},"0" : {
				body : {
					shiftX : 4,
					shiftY : 24
				},arm : {
					shiftX : 29,
					shiftY : 27
				},hand : {
					shiftX : 0,
					shiftY : 41
				}
			},"1" : {
				body : {
					shiftX : 3,
					shiftY : 26
				},arm : {
					shiftX : 31,
					shiftY : 30
				},hand : {
					shiftX : -1,
					shiftY : 48
				}
			},"2" : {
				body : {
					shiftX : 6,
					shiftY : 21
				},arm : {
					shiftX : 26,
					shiftY : -1
				},armOverHair : {
					shiftX : 11,
					shiftY : 4
				}
			},"3" : {
				body : {
					shiftX : 10,
					shiftY : 31
				},arm : {
					shiftX : 7,
					shiftY : 35
				}
			}
		},swingT1 : {
			init : {
				width : 59,
				height : 59
			},"0" : {
				body : {
					shiftX : 7,
					shiftY : 18
				},arm : {
					shiftX : 20,
					shiftY : 2
				},armOverHair : {
					shiftX : 27,
					shiftY : -1
				}
			},"1" : {
				body : {
					shiftX : 9,
					shiftY : 17
				},arm : {
					shiftX : 2,
					shiftY : 15
				},armOverHair : {
					shiftX : 6,
					shiftY : 3
				}
			},"2" : {
				body : {
					shiftX : 9,
					shiftY : 14
				},arm : {
					shiftX : 5,
					shiftY : 24
				}
			}
		},swingT2 : {
			init : {
				width : 56,
				height : 50
			},"0" : {
				body : {
					shiftX : 5,
					shiftY : 4
				}
			},"1" : {
				body : {
					shiftX : -1,
					shiftY : 6
				},arm : {
					shiftX : 7,
					shiftY : 11
				}
			},"2" : {
				body : {
					shiftX : 10,
					shiftY : 8
				},arm : {
					shiftX : 14,
					shiftY : 15
				}
			}
		},swingT3 : {
			init : {
				width : 50,
				height : 50
			},"0" : {
				body : {
					shiftX : 8,
					shiftY : 10
				},arm : {
					shiftX : 20,
					shiftY : 16
				}
			},"1" : {
				body : {
					shiftX : 6,
					shiftY : 16
				},arm : {
					shiftX : 8,
					shiftY : 16
				}
			},"2" : {
				body : {
					shiftX : -5,
					shiftY : -1
				},arm : {
					shiftX : -1,
					shiftY : 5
				}
			}
		},swingTF : {
			init : {
				width : 57,
				height : 59
			},"0" : {
				body : {
					shiftX : 14,
					shiftY : 5
				}
			},"1" : {
				body : {
					shiftX : 15,
					shiftY : 11
				},arm : {
					shiftX : 32,
					shiftY : 12
				}
			},"2" : {
				body : {
					shiftX : 17,
					shiftY : 19
				},arm : {
					shiftX : 8,
					shiftY : -1
				}
			},"3" : {
				body : {
					shiftX : 8,
					shiftY : 15
				},arm : {
					shiftX : 3,
					shiftY : 27
				}
			}
		},walk1 : {
			init : {
				width : 46,
				height : 42
			},"0" : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 22,
					shiftY : 5
				}
			},"1" : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 14,
					shiftY : 7
				}
			},"2" : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 23,
					shiftY : 4
				}
			},"3" : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 24,
					shiftY : 5
				}
			}
		},walk2 : {
			init : {
				width : 38,
				height : 38
			},"0" : {
				body : {
					shiftX : 0,
					shiftY : 1
				},arm : {
					shiftX : 12,
					shiftY : 3
				},hand : {
					shiftX : 2,
					shiftY : 4
				}
			},"1" : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 14,
					shiftY : 4
				},hand : {
					shiftX : 4,
					shiftY : 5
				}
			},"2" : {
				body : {
					shiftX : 0,
					shiftY : 0
				},arm : {
					shiftX : 14,
					shiftY : 3
				},hand : {
					shiftX : 4,
					shiftY : 4
				}
			},"3" : {
				body : {
					shiftX : 0,
					shiftY : 1
				},arm : {
					shiftX : 14,
					shiftY : 4
				},hand : {
					shiftX : 4,
					shiftY : 5
				}
			}
		}
	};


	unit.mail = {
		'01050078' : {
			alert : {
				'0' : {
					mail : {
						shiftX : 4,
						shiftY : 2
					},mailArm : {
						shiftX : 20,
						shiftY : 6
					}
				},'1' : {
					mail : {
						shiftX : 4,
						shiftY : 2
					},mailArm : {
						shiftX : 19,
						shiftY : 5
					}
				},'2' : {
					mail : {
						shiftX : 4,
						shiftY : 1
					},mailArm : {
						shiftX : 19,
						shiftY : 5
					}
				}
			},shoot1 : {
				'0' : {
					mail : {
						shiftX : 9,
						shiftY : 3
					},mailArm : {
						shiftX : 26,
						shiftY : 2
					}
				},'1' : {
					mail : {
						shiftX : 9,
						shiftY : 3
					},mailArm : {
						shiftX : 36,
						shiftY : 2
					}
				}
			},shoot2 : {
				'0' : {
					mail : {
						shiftX : 8,
						shiftY : 3
					},mailArm : {
						shiftX : 28,
						shiftY : 5
					}
				},'1' : {
					mail : {
						shiftX : 8,
						shiftY : 3
					},mailArm : {
						shiftX : 17,
						shiftY : 3
					}
				},'2' : {
					mail : {
						shiftX : 8,
						shiftY : 3
					},mailArm : {
						shiftX : 24,
						shiftY : 6
					}
				},'3' : {
					mail : {
						shiftX : 8,
						shiftY : 3
					},mailArm : {
						shiftX : 30,
						shiftY : 7
					}
				},'4' : {
					mail : {
						shiftX : 10,
						shiftY : 4
					},mailArm : {
						shiftX : 29,
						shiftY : 5
					}
				}
			},walk1 : {
				'0' : {
					mail : {
						shiftX : 7,
						shiftY : 2
					},mailArm : {
						shiftX : 25,
						shiftY : 4
					}
				},'1' : {
					mail : {
						shiftX : 3,
						shiftY : 1
					},mailArm : {
						shiftX : 20,
						shiftY : 7
					}
				},'2' : {
					mail : {
						shiftX : 8,
						shiftY : 0
					},mailArm : {
						shiftX : 0,
						shiftY : 0
					}
				},'3' : {
					mail : {
						shiftX : 6,
						shiftY : 2
					},mailArm : {
						shiftX : 27,
						shiftY : 4
					}
				}
			}
		}
	};

	unit.shoes = {
		'01072185' : {
			shoot1 : {
				'0' : {
					shoes : {
						shiftX : 19,
						shiftY : 24
					}
				}
			},shoot2 : {
				'0' : {
					shoes : {
						shiftX : 12,
						shiftY : 21
					}
				}
			},walk1 : {
				'0' : {
					shoes : {
						shiftX : 22,
						shiftY : 26
					}
				},'1' : {
					shoes : {
						shiftX : 7,
						shiftY : 18
					}
				},'2' : {
					shoes : {
						shiftX : 18,
						shiftY : 24
					}
				},'3' : {
					shoes : {
						shiftX : 12,
						shiftY : 19
					}
				}
			}
		}
	};

	unit.glove = {
		'01082457' : {
			shoot1 : {
				'0' : {
					lGlove : {
						shiftX : 4,
						shiftY : 6
					},rGlove : {
						shiftX : 17,
						shiftY : 1
					}
				},'1' : {
					lGlove : {
						shiftX : 4,
						shiftY : 6
					},rGlove : {
						shiftX : 31,
						shiftY : 0
					}
				}
			},walk1 : {
				'0' : {
					lGlove : {
						shiftX : 4,
						shiftY : 11
					},rGlove : {
						shiftX : 27,
						shiftY : 11
					}
				},'1' : {
					lGlove : {
						shiftX : 8,
						shiftY : 15
					},rGlove : {
						shiftX : 16,
						shiftY : 14
					}
				},'2' : {
					lGlove : {
						shiftX : 5,
						shiftY : 10
					},rGlove : {
						shiftX : 0,
						shiftY : 0
					}
				},'3' : {
					lGlove : {
						shiftX : 5,
						shiftY : 8
					},rGlove : {
						shiftX : 31,
						shiftY : 11
					}
				}
			}
		}
	}

	unit.weapon = {
		'01452194' : {
			shoot1 : {
				'0' : {
					weapon : {
						shiftX : -27,
						shiftY : -28
					}
				},'1' : {
					weapon : {
						shiftX : -22,
						shiftY : -30
					}
				},'2' : {
					weapon : {
						shiftX : -30,
						shiftY : -27
					}
				}
			},walk1 : {
				'0' : {
					weapon : {
						shiftX : -6,
						shiftY : -15
					}
				},'1' : {
					weapon : {
						shiftX : -17,
						shiftY : -18
					}
				},'2' : {
					weapon : {
						shiftX : -4,
						shiftY : -16
					}
				},'3' : {
					weapon : {
						shiftX : -3,
						shiftY : -19
					}
				}
			}
		}
	}


	var translate = function( role ){
		var compare = {
			'mail' : 'body',
			'mailArm' : 'arm',
			'mailArmOverHair' : 'armOverHair'
		};
		if( role in compare ){
			return compare[role];
		}else{
			return null;
		}
	}



	var assembl = function(){
	};

	assembl.prototype = {
		getData : function( imageName ){
			var info = imageName.split('.'),
				status = info[0],
				index = info[1],
				role = info[2];
			if( !( role in unit.character[status][index] ) ){
				if( role in unit.mail['01050078'][status][index] )
					return unit.mail['01050078'][status][index][role];
			}else{
				return unit.character[status][index][role];
			}
			
		}
	}
	return assembl;
});