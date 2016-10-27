angular.module('MyApp')
	.filter('deadline', function(){
		return function(value, sort) {
			var list = value,
					deadline = [],
					now      = new Date().toISOString(),
					valL     = value.length;

			if(sort === 'deadline'){					
				for(var i=0; i<valL;i++){
					if(value[i].timeEnd < now){
						deadline.push(value[i]);
					};
				}
				return deadline
			}else if(sort === 'done'){
				for(var i=0; i<valL;i++){
					if(value[i].status){
						deadline.push(value[i]);
					};
				}
				return deadline
			}else if(sort === 'open'){
				for(var i=0; i<valL;i++){
					if(value[i].status !== true){
						deadline.push(value[i]);
					};
				}
				return deadline
			}else{
				return list
			}
		}
	}).filter('priority', function(){
		return function(value, sort) {
			var priority = [],					
					valL     = value.length;

			if(sort){					
				for(var i=0; i<valL;i++){
					if(value[i].priority === true && value[i].status !== true){
						priority.push(value[i]);
					};
				}
				return priority
			}else{
				return value
			}
		}
	}).filter('coment', function(){
		return function(value, sort) {
			var result = [],					
					valL   = value.length;

			if(sort){					
				for(var i=0; i<valL;i++){
					if(!value[i].coment.length){
						result.push(value[i]);
					};
				}
				return result
			}else{
				return value
			}
		}
	}).filter('dateDiffer', function(){
		return function(dateStart, dateEnd){
			var start = new Date(dateStart).valueOf(),
				end   = new Date(dateEnd).valueOf(),
				difference  = end - start,				
				result = parseInt(difference / 86400000);				

			if(result > 0){
				return 'Left '+ result +' days';
			}else if(result == 0){
				return 'Task end today';					
			}else{
				return 'Task stitch on '+ -result +' days';					
			};				
		}
	});