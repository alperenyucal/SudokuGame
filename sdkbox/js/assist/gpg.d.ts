
declare module gpg {

    export function IsSuccess(response_status: number) : boolean;

    export enum AuthOperation {
        SIGN_IN = 0,
        SIGN_OUT = 0,
    }

    export enum AuthStatus {
        VALID = 0,
        ERROR_INTERNAL = 0,
        ERROR_NOT_AUTHORIZED = 0,
        ERROR_VERSION_UPDATE_REQUIRED = 0,
        ERROR_TIMEOUT = 0,
    }

    export enum UIStatus {
        VALID = 0,
        ERROR_INTERNAL = 0,
        ERROR_NOT_AUTHORIZED = 0,
        ERROR_VERSION_UPDATE_REQUIRED = 0,
        ERROR_TIMEOUT = 0,
        ERROR_CANCELED = 0,
        ERROR_UI_BUSY = 0,
        ERROR_LEFT_ROOM = 0,
    }

    export enum LogLevel {
        VERBOSE = 0,
        INFO = 0,
        WARNING = 0,
        ERROR = 0,
    }

    export enum ImageResolution {
        ICON = 0,
        HI_RES = 0,
    }

    export enum SnapshotConflictPolicy {
        MANUAL = 0,
        LONGEST_PLAYTIME = 0,
        LAST_KNOWN_GOOD = 0,
        MOST_RECENTLY_MODIFIED = 0,
        HIGHEST_PROGRESS = 0,
        DefaultConflictPolicy = 0,
    }

    export enum ResponseStatus {
        VALID = 0,
        VALID_BUT_STALE = 0,
        ERROR_LICENSE_CHECK_FAILED = 0,
        ERROR_INTERNAL = 0,
        ERROR_NOT_AUTHORIZED = 0,
        ERROR_VERSION_UPDATE_REQUIRED = 0,
        ERROR_TIMEOUT  = 0,
    }

    export enum DataSource {
        CACHE_OR_NETWORK = 0,
        NETWORK_ONLY = 0,
    }

    export enum LeaderboardOrder {
        LARGER_IS_BETTER = 0,
        SMALLER_IS_BETTER = 0,
        INVALID  = 0,
    }

    export enum LeaderboardStart {
        TOP_SCORES = 0,
        PLAYER_CENTERED = 0,
        INVALID  = 0,
    }

    export enum LeaderboardTimeSpan {
        DAILY = 0,
        WEEKLY = 0,
        ALL_TIME = 0,
        INVALID  = 0,
    }

    export enum LeaderboardCollection {
        PUBLIC = 0,
        SOCIAL = 0,
        INVALID  = 0,
    }

    export enum AchievementType {
        STANDARD  = 0,
        INCREMENTAL  = 0,
        INVALID  = 0,
    }

    export enum AchievementState {
        HIDDEN  = 0,
        REVEALED  = 0,
        UNLOCKED  = 0,
        INVALID  = 0,
    }

    export enum QuestFetchFlags {
        UPCOMING = 0,
        OPEN = 0,
        ACCEPTED = 0,
        COMPLETED = 0,
        COMPLETED_NOT_CLAIMED = 0,
        EXPIRED = 0,
        ENDING_SOON = 0,
        FAILED = 0,
        ALL = 0,
    }

    export enum QuestState {
        UPCOMING = 0,
        OPEN = 0,
        ACCEPTED = 0,
        COMPLETED = 0,
        EXPIRED = 0,
        FAILED = 0,
        INVALID  = 0,
    }

    export enum QuestMilestoneState {
        NOT_STARTED = 0,
        NOT_COMPLETED = 0,
        COMPLETED_NOT_CLAIMED = 0,
        CLAIMED = 0,
        INVALID  = 0,
    }

    export enum EventVisibility {
        HIDDEN  = 0,
        REVEALED  = 0,
    }

    export enum MultiplayerInvitationType {
        TURN_BASED  = 0,
        REAL_TIME  = 0,
        INVALID  = 0,
    }

    export enum RealTimeRoomStatus {
        INVITING  = 0,
        CONNECTING  = 0,
        AUTO_MATCHING  = 0,
        ACTIVE  = 0,
        DELETED  = 0,
        INVALID  = 0,
    }

    export enum ParticipantStatus {
        INVITED = 0,
        JOINED = 0,
        DECLINED = 0,
        LEFT = 0,
        NOT_INVITED_YET = 0,
        FINISHED = 0,
        UNRESPONSIVE = 0,
        INVALID = 0,
    }

    export enum MatchResult {
        DISAGREED = 0,
        DISCONNECTED = 0,
        LOSS = 0,
        NONE = 0,
        TIE = 0,
        WIN = 0,
        INVALID = 0,
    }

    export enum MatchStatus {
       INVITED = 0,
       THEIR_TURN = 0,
       MY_TURN = 0,
       PENDING_COMPLETION = 0,
       COMPLETED = 0,
       CANCELED = 0,
       EXPIRED = 0,
       INVALID = 0,
    }

    export enum MultiplayerStatus {
        VALID = BaseStatus.VALID,
        VALID_BUT_STALE = BaseStatus.VALID_BUT_STALE,
        ERROR_INTERNAL = BaseStatus.ERROR_INTERNAL,
        ERROR_NOT_AUTHORIZED = BaseStatus.ERROR_NOT_AUTHORIZED,
        ERROR_VERSION_UPDATE_REQUIRED = BaseStatus.ERROR_VERSION_UPDATE_REQUIRED,
        ERROR_TIMEOUT = BaseStatus.ERROR_TIMEOUT,
        ERROR_MATCH_ALREADY_REMATCHED = BaseStatus.ERROR_MATCH_ALREADY_REMATCHED,
        ERROR_INACTIVE_MATCH = BaseStatus.ERROR_INACTIVE_MATCH,
        ERROR_INVALID_RESULTS = BaseStatus.ERROR_INVALID_RESULTS,
        ERROR_INVALID_MATCH = BaseStatus.ERROR_INVALID_MATCH,
        ERROR_MATCH_OUT_OF_DATE = BaseStatus.ERROR_MATCH_OUT_OF_DATE,
        ERROR_REAL_TIME_ROOM_NOT_JOINED = BaseStatus.ERROR_REAL_TIME_ROOM_NOT_JOINED
    }

    export class PlatformConfiguration {
        SetClientID( client_id: string );
    }

    module GameServices {

        export function IsAuthorized(): boolean;
        export function StartAuthorizationUI(): void;
        export function SignOut(): void;

        export class Builder {
            SetOnAuthActionStarted(authActionStartedCallback: Function): gpg.GameServices.Builder;
            SetOnAuthActionFinished(authActionFinishedCallback: Function): gpg.GameServices.Builder;
            SetOnMultiplayerInvitationEvent(MultiplayerInvitationCallback: Function): gpg.GameServices.Builder;
            EnableSnapshots(): gpg.GameServices.Builder;
            Create(BuilderCreateCallback: Function, platform_configuration: object): gpg.GameServices.Builder;
            SetLogging(level: gpg.LogLevel): gpg.GameServices.Builder;
        }

        export class Players {
            FetchSelf(data_source: gpg.DataSource, PlayersFetchSelfCallback: Function): void;
            Fetch( params: object, callback : Function): void;
        }

        export class Snapshots {
            ShowSelectUIOperation(params: object, callback: Function): void;
            Load( tSnapshotLoadParams: object, callback: Function ): void;
            Save( params: object, callback : Function ): void;
            FetchAll( params: object, callback: Function ): void;
            Delete( filename: string, callback: Function ): void;
        }

        export class Leaderboards {
            Fetch( params: object, callback: Function ): void;
            FetchAll( datasource: object, callback: Function ): void;
            FetchScoreSummary( params: object, callback: Function ): void;
            FetchAllScoreSummaries( params: object, callback: Function ): void;
            SubmitScore( params: object, callback: Function ): void;
            ShowUI( leaderboard_id:string, callback: Function ): void;
            ShowAllUI( callback: Function ): void;
            FetchScorePage( params: object, callback: Function ): void;
            FetchNextScorePage( params: object, callback: Function ): void;
            FetchPreviousScorePage( params: object, callback: Function ): void;
        }

        export class Achievements {
            FetchAll( datasource:gpg.DataSource, callback: Function ): void;
            Fetch( params: object, callback: Function ): void;
            ShowAllUI( callback: Function ): void;
            Increment( params: object ): void;
            SetStepsAtLeast( params: object ): void;
            Reveal( achievement_id:string ): void;
            Unlock( achievement_id:string ): void;
        }

        export class RealTimeMultiplayer {
            CreateRealTimeRoom( params: object, listener: Function, callback: Function ): void;
            ShowRoomInboxUI( callback: Function ): void;
            LeaveRoom( callback: Function ): void;
            AcceptInvitation( accept_params: object, callback: Function ): void;
            DismissInvitation( invitation_id:string ): void;
            DeclineInvitation( invitation_id:string ): void;
            FetchInvitations( callback: Function ): void;
            SendReliableMessage( params: object, callback: Function ): void;
            SendUnreliableMessage( params: object ): void;
            SendUnreliableMessageToOthers( params: object ): void;
        }


        export class Quests {
            Fetch(params: object, callback: Function): void;
            FetchList(data_source:gpg.DataSource, callback: Function): void;
            ShowAllUI(callback: Function): void;
            ShowUI(quest_id:string, callback: Function): void;
            Accept( quest_id:string, callback: Function ): void;
            ClaimMilestone(milestone_id:string, callback: Function): void;
        }

        export class Events {
            Fetch(params: object, callback: Function): void;
            FetchAll( data_source:gpg.DataSource, callback: Function): void;
            Increment( params: object ): void;
        }

        export class Stats {
            FetchForPlayer(data_source:gpg.DataSource, callback: Function): void;
        }

        export class NearbyConnections {
            Init(str_json:string, callback: Function): void;
            GetLocalEndpointId(): void;
            GetLocalDeviceId(): void;
            StartAdvertising(str_json:string, start_advertising_callback: Function, request_callback: Function): void;
            StopAdvertising(): void;
            AcceptConnectionRequest(remote_endpoint_id:string, payload, callback: Function): void;
            RejectConnectionRequest(remote_endpoint_id:string): void;
            StartDiscovery(service_id:string, duration, callback: Function): void;
            StopDiscovery( service_id:string): void;
            SendConnectionRequest(name:string, remote_endpoint_id:string, payload:string, connect_response_callback: Function, message_callback: Function): void;
            SendReliableMessage(remote_endpoint_id:string, payload:string): void;
            SendUnreliableMessage(remote_endpoint_id:string, payload:string): void;
            Disconnect(remote_endpoint_id:string): void;
            Stop(): void;
        }

        export class TurnBasedMultiplayer {
            CreateTurnBasedMatch(callback: Function, params:object): void;
            DismissMatch(match_id:string): void;
            FetchMatch(callback: Function, match_id:string): void;
            Rematch(callback: Function, match_id:string): void;
            CancelMatch(callback: Function, match_id:string): void;
            FetchMatches(callback: Function): void;
            ShowMatchInboxUI(callback: Function): void;
            TakeMyTurn(callback: Function, match_id:string, participant_results_id:string, next_participant_id:string, data:string): void;
            FinishMatchDuringMyTurn(callback: Function, match_id:string, participant_results_id:string, data:string): void;
            ConfirmPendingCompletion(callback: Function, match_id:string): void;
            LeaveMatchDuringTheirTurn(callback: Function, match_id:string): void;
            LeaveMatchDuringMyTurn(callback: Function, match_id:string, next_participant_id:string): void;
            CreateParticipantResult(match_id:string, participant_id:string, placing:string, matchResult:string): void;
            AcceptInvitation(callback: Function, invitation_id:string): void;
            DeclineInvitation(invitation_id:string): void;
            DismissInvitation(invitation_id:string): void;
            SynchronizeData(): void;
            ShowPlayerSelectUI(callback: Function, min_players:number, max_players:number, allow_automatch:boolean): void;

        }

    }

    export class RealTimeEventListener {
        onRoomStatusChanged (room: object): void;
        onConnectedSetChanged (room: object): void;
        onP2PConnected (room: object, participant: object): void;
        onP2PDisconnected (room: object, participant: object): void;
        onParticipantStatusChanged (room: object, participant: object): void;
        onDataReceived (room: object, from_participant: object, data:string, is_reliable:boolean): void;
    }

}




