/* Construtor da componente

	A componente contem a informacao das transformacoes, dos materiais, das texturas e das primitivas associadas a cada objeto*/
function MyComponent() {
	CGFscene.call(this);

	this.id = "";

	this.transformation_ref = "";
	this.matrix = null;
	this.matrix_b = null;

	this.translates = [];
	this.rotates = [];
	this.scales = [];

	this.materials = [];
	this.texture = "";
	this.animations = [];
    this.curr_anim = 0;

	this.primitivess = [];
	this.children_comp = [];
	this.children_prim = [];
}

MyComponent.prototype = Object.create(CGFscene.prototype);
MyComponent.prototype.constructor = MyComponent;

MyComponent.prototype.update = function(tempovar, tempo_dec){

    if(this.animations.length != 0){

        if(this.curr_anim < this.animations.length){
            var i = this.curr_anim;
            var anime = this.animations[i];
            if(!anime.completed || i == 0){
                if(anime instanceof LinearAnimation){
                    for(var j =0; j< anime.cPoints.length;j++){
                        if(anime.times[j] > tempo_dec && anime.next_anim[j]){
                            anime.translate.x += anime.walk_d[j][0] * tempovar;
                            anime.translate.y += anime.walk_d[j][1] * tempovar;
                            anime.translate.z += anime.walk_d[j][2] * tempovar;
                        }
                        else if(anime.times[j] <= tempo_dec){
                            anime.next_anim[j+1]= true;
                            if(j+1 != anime.cPoints.length)anime.rotate = anime.angles[j+1];
                            else this.curr_anim++;
                        }
                    }
                }
								else{
										if(anime.time > tempo_dec){
													anime.ang_ant = anime.angle_temp;
													anime.angle_temp += (anime.angle_per_it * tempo_dec ) /1000 ;
										}
								}
            }
        }
    }
}
