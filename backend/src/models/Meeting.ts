import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import DevelopmentTeam from "./DevelopmentTeam";

@Table({
    underscored: true,
    tableName: 'meetings'
})
export default class Meeting extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number

    @ForeignKey(() => DevelopmentTeam)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    development_team_id: number

    @AllowNull(false)
    @Column(DataType.DATE)
    start_datetime: Date

    @AllowNull(false)
    @Column(DataType.DATE)
    end_datetime: Date

    @AllowNull(false)
    @Column(DataType.TEXT)
    description: string

    @AllowNull(false)
    @Column(DataType.STRING)
    room: string

    @BelongsTo(() => DevelopmentTeam)
    developmentTeam: DevelopmentTeam

}
