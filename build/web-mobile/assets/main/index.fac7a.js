window.__require=function t(e,i,n){function o(c,s){if(!i[c]){if(!e[c]){var l=c.split("/");if(l=l[l.length-1],!e[l]){var r="function"==typeof __require&&__require;if(!s&&r)return r(l,!0);if(a)return a(l,!0);throw new Error("Cannot find module '"+c+"'")}c=l}var u=i[c]={exports:{}};e[c][0].call(u.exports,function(t){return o(e[c][1][t]||t)},u,u.exports,t,e,i,n)}return i[c].exports}for(var a="function"==typeof __require&&__require,c=0;c<n.length;c++)o(n[c]);return o}({audioController:[function(t,e,i){"use strict";cc._RF.push(e,"379feMDXR9GK6r6ha5SjYA5","audioController"),cc.Class({extends:cc.Component,properties:{hit:{default:null,type:cc.AudioClip},scream:{default:null,type:cc.AudioClip},dead:{default:null,type:cc.AudioClip},laugh:{default:null,type:cc.AudioClip}},onLoad:function(){},_playHitMusic:function(){this.hitMusic=cc.audioEngine.play(this.hit,!1,1)},_playScreamMusic:function(){this.screamMusic=cc.audioEngine.play(this.scream,!1,1)},_playDeadMusic:function(){this.deadMusic=cc.audioEngine.play(this.dead,!1,1)},_playLaughMusic:function(){this.laughMusic=cc.audioEngine.play(this.laugh,!1,1)}}),cc._RF.pop()},{}],gameMainController:[function(t,e,i){"use strict";cc._RF.push(e,"8dbd4hitj5J6IZjNFCB6kqz","gameMainController"),cc.Class({extends:cc.Component,properties:{startGameNode:{default:null,type:cc.Node},playGameNode:{default:null,type:cc.Node},hitCount:{default:null,type:cc.Label},killCount:{default:null,type:cc.Label},slashPrefab:{default:null,type:cc.Prefab},monsterPrefab:{default:null,type:cc.Prefab},mask:{default:null,type:cc.Node},gameOver:{default:null,type:cc.Node},success:{default:null,type:cc.Node},quitButton:{default:null,type:cc.Node},audioManager:{default:null,type:cc.Node}},onLoad:function(){this.data={kill:5,hit:10},this.init(),this.node.on(cc.Node.EventType.TOUCH_START,this._on_touch_start,this),this.audioController=this.audioManager.getComponent("audioController")},_on_touch_start:function(t){var e=this.node.getContentSize(),i=t.getLocation(),n=cc.instantiate(this.slashPrefab);n.position=cc.v2(i.x-e.width/2,i.y-e.height/2),n.parent=this.node,this.audioController._playHitMusic(),this.scheduleOnce(function(){n.destroy()},.1),this.data.hit-=1,this.calculateCount()},init:function(){this.startGameNode.active=!0,this.playGameNode.active=!1,this.gameOver.opacity=0,this.success.opacity=0,this.quitButton.active=!1},createMonster:function(){for(var t=0;t<this.data.kill;t++){var e=cc.instantiate(this.monsterPrefab),i=this.getRndInteger(1,3);e.getComponent("monsterController").setupMonster(i),e.getComponent("monsterController").linkWithMainController(this),e.x=this.getRndInteger(-415,415),e.y=this.getRndInteger(-135,135),e.parent=this.node}},renderCounts:function(){this.killCount.string=this.data.kill,this.hitCount.string=this.data.hit},getRndInteger:function(t,e){return Math.floor(Math.random()*(e-t+1))+t},calculateCount:function(){this.renderCounts(),(this.data.kill>0||this.data.hit>0)&&(this.mask.active=!1,this.gameOver.opacity=0,this.success.opacity=0),0==this.data.kill&&(this.mask.active=!0,this.success.opacity=255,this.quitButton.active=!0,this.audioController._playLaughMusic()),this.data.hit<=0&&(this.data.kill>0?(this.mask.active=!0,this.gameOver.opacity=255,this.quitButton.active=!0,this.audioController._playDeadMusic()):(this.mask.active=!0,this.success.opacity=255,this.quitButton.active=!0,this.audioController._playLaughMusic()))},onClickPlayButton:function(){this.startGameNode.active=!1,this.playGameNode.active=!0,this.renderCounts(),this.createMonster()},onClickQuitButton:function(){cc.game.end()}}),cc._RF.pop()},{}],monsterController:[function(t,e,i){"use strict";cc._RF.push(e,"8c44f9/TcpFFYT7J7dosVIf","monsterController"),cc.Class({extends:cc.Component,properties:{monsterImage:{default:[],type:cc.SpriteFrame},monster:{default:null,type:cc.Sprite}},onLoad:function(){},linkWithMainController:function(t){this.mainController=t},setupMonster:function(t){this.monster.spriteFrame=this.monsterImage[t-1],this.node.opacity=5,this.node.getComponent(cc.Button).interactable=!0},onClickMonster:function(){var t=this;t.node.opacity=255,t.node.getComponent(cc.Button).interactable=!1,t.mainController.data.hit-=1,t.mainController.data.kill-=1,t.mainController.audioController._playScreamMusic(),t.scheduleOnce(function(){t.node.destroy(),t.mainController.calculateCount()},.5)}}),cc._RF.pop()},{}]},{},["audioController","gameMainController","monsterController"]);