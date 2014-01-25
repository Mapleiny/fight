define(function(){
	return {
		source : {
			'00002000.img' : {
				'info' : {
					'name' : '00002000.img',
					'srcInfo' : {
						src : '../../image/charater/0002000.img.png',
						width : 806,
						height : 218
					}
				},'data' : {
					'walk1.0.arm.png': {
						'x': '129',
						'y': '218',
						'width': '12',
						'height': '17'
					},
					'walk1.0.body.png': {
						'x': '141',
						'y': '218',
						'width': '27',
						'height': '32'
					},
					'walk1.1.arm.png': {
						'x': '168',
						'y': '218',
						'width': '13',
						'height': '17'
					},
					'walk1.1.body.png': {
						'x': '181',
						'y': '218',
						'width': '26',
						'height': '32'
					},
					'walk1.2.arm.png': {
						'x': '207',
						'y': '218',
						'width': '12',
						'height': '17'
					},
					'walk1.2.body.png': {
						'x': '219',
						'y': '218',
						'width': '24',
						'height': '32'
					},
					'walk1.3.arm.png': {
						'x': '243',
						'y': '218',
						'width': '14',
						'height': '15'
					},
					'walk1.3.body.png': {
						'x': '257',
						'y': '218',
						'width': '29',
						'height': '31'
					}
				}
			}
		},rule : {
			'unitId' : {
				'walk1': {
					'0': {
						'body' : {
							'body': {
								'src': 'walk1.0.body.png',
								'origin': '19,32',
								'map': {
									'neck': '-4,-32',
									'navel': '-6,-20'
								},
								'z': 'body',
								'group': 'skin',
								'source' : '00002000.img'
							},
							'arm': {
								'src': 'walk1.0.arm.png',
								'origin': '6,8',
								'map': {
									'navel': '-12,2',
									'hand': '1,5'
								},
								'z': 'arm',
								'group': 'skin'
							},
							'face': '1',
							'delay': '180'
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
							'group': 'skin'
						},
						'arm': {
							'src': 'walk1.1.arm.png',
							'origin': '6,9',
							'map': {
								'navel': '-6,-1',
								'hand': '-2,5'
							},
							'z': 'arm',
							'group': 'skin'
						},
						'face': '1',
						'delay': '180'
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
							'group': 'skin'
						},
						'arm': {
							'src': 'walk1.2.arm.png',
							'origin': '6,8',
							'map': {
								'navel': '-12,2',
								'hand': '1,6'
							},
							'z': 'arm',
							'group': 'skin'
						},
						'face': '1',
						'delay': '180'
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
							'group': 'skin'
						},
						'arm': {
							'src': 'walk1.3.arm.png',
							'origin': '7,7',
							'map': {
								'navel': '-13,4',
								'hand': '3,5'
							},
							'z': 'arm',
							'group': 'skin'
						},
						'face': '1',
						'delay': '180'
					}
				}
			},'head' : 
		}
	};
});