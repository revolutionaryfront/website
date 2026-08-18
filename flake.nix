{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = {
          current = nixpkgs.legacyPackages.${system};
        };
      in {
        formatter = pkgs.current.nixpkgs-fmt;
        devShells.default = pkgs.current.mkShell {
          packages = (with pkgs.current; [
            nodejs_24
          ]);
          shellHook = ''
            export PATH="$(realpath -m ./node_modules/.bin):$PATH"
          '';
        };
      });
}
