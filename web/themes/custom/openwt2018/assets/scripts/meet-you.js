(function ($, window, Drupal, drupalSettings) {

  var initialized;

  function init() {
    if (!initialized) {

      initialized = true;

      var selectCallbacks = [
        {
          selector: "select-type-front",
          callback: function (value, id) {
            $("#modal-type-value").html(value);
            $("input[id*=edit-project-type]").val(value);
          },
          scrollTo: false
        },
        {
          selector: "select-duration-front",
          callback: function (value, id) {
            $("#modal-duration-value").html(value);
            $("input[id*=edit-project-duration]").val(value);
          },
          scrollTo: false
        },
        {
          selector: "select-skill-front",
          callback: function (value, id) {
            $("#open-positions-skill").val(value);
            setOpenPositionsNum();
          },
          scrollTo: false
        },
        {
          selector: "select-city-front",
          callback: function (value, id) {
            if (value == Drupal.t('Lausanne / EPFL')) {
              value = Drupal.t('Lausanne');
            } else {
              value = value;
            }
            $("#open-positions-city").val(value);
            setOpenPositionsNum();
          },
          scrollTo: false
        },
        {
          selector: "select-type-modal",
          callback: function (value, id) {
            $("input[id*=edit-project-type]").val(value);
          },
          scrollTo: false
        },
        {
          selector: "select-duration-modal",
          callback: function (value, id) {
            $("input[id*=edit-project-duration]").val(value);
          },
          scrollTo: false
        }
      ];

      Drupal.openwt2018.selectCallback = Drupal.openwt2018.selectCallback.concat(selectCallbacks);

      setOpenPositionsNum(true);
    }
  }

  function setOpenPositionsNum(reset) {
    if ($("#open-positions-jobs").length) {
      var reset = reset || false;
      if (reset) {
        $("#open-positions-skill").val("");
        $("#open-positions-city").val("");
      }
      //filter job without skills = none
      var jobs = JSON.parse($("#open-positions-jobs").val()).filter(function(item) {
        return item.skills.toLowerCase() !== 'none';
      });

      // Get filters values
      var city = $("#open-positions-city").val();
      var skill = $("#open-positions-skill").val();

      var no_jobs = $("#no-open-positions").val();

      var city_id = $("#select-city-front li[id=0]").text();
      var skill_id = $("#select-skill-front li[id=0]").text();


      var button_value = $("#open-positions-button").val();

      var filtered_jobs = jobs;

      if(jobs.length > 0){
        $("#open-jobs-numbers").text(jobs.length);
      }

      // Filter by skill
      if (skill.trim() !== "" && skill != skill_id) {
        filtered_jobs = $.grep(filtered_jobs, function (job) {
          return job.skills != null && job.skills.indexOf(skill) >= 0;
        });
      }
      else {
        $("#open-positions-skill").val("");
      }

      // Filter by city
      if (city.trim() !== "" && city != city_id) {
        filtered_jobs = $.grep(filtered_jobs, function (job) {
          return job.city != null && job.city.indexOf(city) >= 0;
        });
      }
      else {
        $("#open-positions-city").val("");
      }

      // Set result
      if (filtered_jobs.length) {
        $("#see-open-positions").html(button_value.replace("%num%", filtered_jobs.length)).prop("disabled", false);
      }
      else {
        $("#see-open-positions").html(no_jobs).prop("disabled", true);
      }
    }
  }


  Drupal.behaviors.meetYou = {
    attach: function () {
      init();
    }
  }


})(jQuery, this, Drupal, drupalSettings);

