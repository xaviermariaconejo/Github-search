export class User {
  // User data
  public id: number;
  public type: string;
  public loginName: string;
  public name: string;
  public company: string;
  public imgProfile: string;
  public blog: string;
  public location: string;
  public email: string;
  public hireable: boolean;
  public bio: string;
  public publicReposCount: string;
  public publicGistsCount: string;
  public followersCount: string;
  public followingCount: string;
  public createdAt: string;
  public updatedAt: string;
  public htmlUrl: string;
  public followersList: string[];
  public publicReposList: string[];
  // Api data
  public apiInfo: string;
  public apiFollowers: string;
  public apiFollowing: string;
  public apiGists: string;
  public apiStarred: string;
  public apiSubscriptions: string;
  public apiOrganizations: string;
  public apiRepos: string;
  public apiEvents: string;
  public apiReceivedEvents: string;

  // Constructors
  constructor() {
    this.followersList = null;
    this.publicReposList = null;
  }

  // Initialize user values from json data
  init(json: any) {
    // User data
    this.id = json.id;
    this.type = json.type;
    this.loginName = json.login;
    this.name = json.name;
    this.company = json.company;
    this.imgProfile = json.avatar_url;
    this.blog = json.blog;
    this.location = json.location;
    this.email = json.email;
    this.hireable = json.hireable;
    this.bio = json.bio;
    this.publicReposCount = json.public_repos;
    this.publicGistsCount = json.public_gists;
    this.followersCount = json.followers;
    this.followingCount = json.following;
    this.createdAt = json.created_at;
    this.updatedAt = json.updated_at;
    this.htmlUrl = json.html_url;
    // Api data
    this.apiInfo = json.url;
    this.apiFollowers = json.followers_url;
    this.apiFollowing = json.following_url;
    this.apiGists = json.gists_url;
    this.apiStarred = json.starred_url;
    this.apiSubscriptions = json.subscriptions_url;
    this.apiOrganizations = json.organizations_url;
    this.apiRepos = json.repos_url;
    this.apiEvents = json.events_url;
    this.apiReceivedEvents = json.received_events_url;
  }
}
