import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  type OldUser = { username : Text; password : Text };
  type OldActor = { users : Map.Map<Text, OldUser> };
  type NewUser = { password : Text };
  type NewActor = { users : Map.Map<Text, NewUser> };

  public func run(old : OldActor) : NewActor {
    let newUsers = old.users.map<Text, OldUser, NewUser>(func(_k, oldUser) { { password = oldUser.password } });
    { old with users = newUsers };
  };
};
