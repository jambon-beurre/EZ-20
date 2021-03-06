
var activated = false;

// Permet de vérifier que l'extension est activée
chrome.runtime.sendMessage({  }, function(response) {
  activated = response.activated;
  run();
});

function run() {
	if(activated) {

		var id_qcm = $('#cphCand_hId_Actif').val();
		var id_question = $('#cphCand_hId_Question').val();
		var type_question = $('#cphCand_hTypeQuestion').val();

		// Récupération du contenu de la page contenant la réponse
		var content = $.ajax({type: "GET", url: "http://quizz.eduqcm.fr/CorrigeUneQuestion.aspx?id_actif=" + id_qcm + "&id_question=" + id_question + "&id_candidat=0", async: false}).responseText;


		// Question ouverte
		// Ne fonctionne pas encore, faute de qcm à tester avec cette feature
		if(type_question == 3) {
			var reponse = $(content).find('#cphVide_CorrigeUC_dCorrige').html();
			$(document).find('#cphCand_txtReponse').html(reponse);
		}

		// Question type QCM
		else {
			var reponses = [];
			$(content).find('[style="background-color:LightGreen;"]').each(function() {
				var array = $(this).find('div').attr('id').split('_');
				reponses.push(array[array.length - 1]);
			});

			$(document).on('keydown', function(key) {
				if(key.which == 18) {
					$.each(reponses, function(id, reponse) {
						$(document).find('#cphCand_gvReponses_lblLibReponse_' + reponse).closest('tr').css("background-color", "LightGreen");
					});
				}
			});
			$(document).on('keyup', function(key) {
				if(key.which == 18) {
					$.each(reponses, function(id, reponse) {
						$(document).find('#cphCand_gvReponses_lblLibReponse_' + reponse).closest('tr').attr('style', '');
					});
				}
			});
		}
	}
}