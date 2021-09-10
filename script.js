$(document).ready(function () {

    var selectedCountry = (selectedRegion = selectedCity = "");
  
    var BATTUTA_KEY = "4d3014bf10ff10581319f3a9a314117c";
    url =
      "https://battuta.medunes.net/api/country/all/?key=" +
      BATTUTA_KEY +
      "&callback=?";
  
    $.getJSON(url, function (data) {
      console.log(data);
      $.each(data, function (index, value) {
        $("#country").append(
          '<option value="' + value.code + '">' + value.name + "</option>"
        );
      });
    });
    
    $("#country").change(function () {
      selectedCountry = this.options[this.selectedIndex].text;
      countryCode = $("#country").val();
      url =
        "https://battuta.medunes.net/api/region/" +
        countryCode +
        "/all/?key=" +
        BATTUTA_KEY +
        "&callback=?";
      $.getJSON(url, function (data) {
        $("#region option").remove();
        $.each(data, function (index, value) {
          $("#region").append(
            '<option value="' + value.region + '">' + value.region + "</option>"
          );
        });
      });
    });
    $("#region").on("change", function () {
      selectedRegion = this.options[this.selectedIndex].text;
      countryCode = $("#country").val();
      region = $("#region").val();
      url =
        "https://battuta.medunes.net/api/city/" +
        countryCode +
        "/search/?region=" +
        region +
        "&key=" +
        BATTUTA_KEY +
        "&callback=?";
      $.getJSON(url, function (data) {
        console.log(data);
        $("#city option").remove();
        $.each(data, function (index, value) {
          $("#city").append(
            '<option value="' + value.city + '">' + value.city + "</option>"
          );
        });
      });
    });
    $("#city").on("change", function () {
      selectedCity = this.options[this.selectedIndex].text;
      $("#location").html(
        "Locatation: Country: " +
        selectedCountry +
        ", Region: " +
        selectedRegion +
        ", City: " +
        selectedCity
      );
    });
  });