var mainApp = angular.module("mainApp", []);
mainApp.controller('ControladorPokemon', function ($scope, $http) {
    $scope.PokemonAux = {};
    $scope.Pokemon = {};
    $scope.Pokemons = [];
    $scope.PokemonsAux = [];
    $scope.nombre = "";
    $scope.types = [];
    $scope.types2 = [];
    $scope.moves = [];
    Pok = {};
    $http.get("https://pokeapi.co/api/v2/pokemon/")

        .then(function (response) {
            $scope.aux = response.data;
            $scope.enviarDatos($scope.aux)
        });


    $scope.enviarDatos = function (arreglo) {

        if (typeof (arreglo) == "string") {
            $scope.PokemonAux = {};
            $scope.PokemonsAux = [];

        }
        else {
            $scope.PokemonsAux = arreglo.results;
            var tipo = "";
            var peso = "";
            var nombre = "";
            var obj = {};
            for (j = 0; j < $scope.PokemonsAux.length; j++) {

                nombre = $scope.PokemonsAux[j].name;
                $http.get("https://pokeapi.co/api/v2/pokemon/" + nombre)

                    .then(function (response) {
                        Pok = response.data;
                        peso = Pok.weight;

                        var tipoaux = Pok.types;
                        for (k = 0; k < tipoaux.length; k++) 
                            tipo = tipo + ", " + tipoaux[k].type.name;

                        if (tipo.length > 3)
                            tipo = tipo.slice(1);

                        obj.tipo = tipo;
                        obj.peso = peso;
                        obj.nombre = Pok.name;
                        obj.url = "https://pokeapi.co/api/v2/pokemon/" + Pok.name;
                        tipo = "";
                        $scope.Pokemons.push(obj);
                        obj = {};
                    });
            }
        }

        $scope.verPokemon = function (i) {

            $http.get("https://pokeapi.co/api/v2/pokemon/" + i)

                .then(function (response) {

                    $scope.Pokemon = response.data;
                    $('#dialogo1').modal('show');
                    $scope.types = $scope.Pokemon.types;
                    $scope.types2 = "";

                    $scope.moves = $scope.Pokemon.moves;
                    $scope.moves2 = "";

                    for (j = 0; j < $scope.types.length; j++) 
                        $scope.types2 = $scope.types2 + ", " + $scope.types[j].type.name;

                    if ($scope.types2.length > 3)
                        $scope.types2 = $scope.types2.slice(1);

                    for (j = 0; j < $scope.moves.length; j++) 
                        $scope.moves2 = $scope.moves2 + ", " + $scope.moves[j].move.name;

                    if ($scope.moves2.length > 3)
                        $scope.moves2 = $scope.moves2.slice(1);

                    $scope.nombre = i;
                    $scope.url = "https://pokeapi.co/api/v2/pokemon/" + i;
                    $scope.weight = $scope.Pokemon.weight;
                    $scope.type = $scope.types2;
                    $scope.description = $scope.Pokemon.description;
                    $scope.movimientos = $scope.moves2;

                    $http.get("https://pokeapi.co/api/v2/characteristic/" +  $scope.Pokemon.id)

                        .then(function (response) {
                            var caracteristicas = response.data;
                            var descriptions = caracteristicas.descriptions;
                            for(j=0;j<descriptions.length;j++)
                            {
                                if(descriptions[j].language.name=='es')
                                    $scope.description=descriptions[j].description;
                            }               
                        });
                });


        }
    }
});

