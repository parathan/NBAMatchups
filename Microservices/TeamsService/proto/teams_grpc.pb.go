// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.4.0
// - protoc             v5.27.2
// source: teams.proto

package teamspb

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.62.0 or later.
const _ = grpc.SupportPackageIsVersion8

const (
	TeamsService_GetTwoTeams_FullMethodName        = "/teams.TeamsService/GetTwoTeams"
	TeamsService_GetAllTeams_FullMethodName        = "/teams.TeamsService/GetAllTeams"
	TeamsService_GetTwoTeamsOrdered_FullMethodName = "/teams.TeamsService/GetTwoTeamsOrdered"
)

// TeamsServiceClient is the client API for TeamsService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type TeamsServiceClient interface {
	GetTwoTeams(ctx context.Context, in *TwoTeamsRequest, opts ...grpc.CallOption) (*TwoTeamsResponse, error)
	GetAllTeams(ctx context.Context, in *AllTeamsRequest, opts ...grpc.CallOption) (*AllTeamsResponse, error)
	GetTwoTeamsOrdered(ctx context.Context, in *TwoTeamsRequest, opts ...grpc.CallOption) (*TwoTeamsOrderedResponse, error)
}

type teamsServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewTeamsServiceClient(cc grpc.ClientConnInterface) TeamsServiceClient {
	return &teamsServiceClient{cc}
}

func (c *teamsServiceClient) GetTwoTeams(ctx context.Context, in *TwoTeamsRequest, opts ...grpc.CallOption) (*TwoTeamsResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(TwoTeamsResponse)
	err := c.cc.Invoke(ctx, TeamsService_GetTwoTeams_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *teamsServiceClient) GetAllTeams(ctx context.Context, in *AllTeamsRequest, opts ...grpc.CallOption) (*AllTeamsResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(AllTeamsResponse)
	err := c.cc.Invoke(ctx, TeamsService_GetAllTeams_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *teamsServiceClient) GetTwoTeamsOrdered(ctx context.Context, in *TwoTeamsRequest, opts ...grpc.CallOption) (*TwoTeamsOrderedResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(TwoTeamsOrderedResponse)
	err := c.cc.Invoke(ctx, TeamsService_GetTwoTeamsOrdered_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// TeamsServiceServer is the server API for TeamsService service.
// All implementations must embed UnimplementedTeamsServiceServer
// for forward compatibility
type TeamsServiceServer interface {
	GetTwoTeams(context.Context, *TwoTeamsRequest) (*TwoTeamsResponse, error)
	GetAllTeams(context.Context, *AllTeamsRequest) (*AllTeamsResponse, error)
	GetTwoTeamsOrdered(context.Context, *TwoTeamsRequest) (*TwoTeamsOrderedResponse, error)
	mustEmbedUnimplementedTeamsServiceServer()
}

// UnimplementedTeamsServiceServer must be embedded to have forward compatible implementations.
type UnimplementedTeamsServiceServer struct {
}

func (UnimplementedTeamsServiceServer) GetTwoTeams(context.Context, *TwoTeamsRequest) (*TwoTeamsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetTwoTeams not implemented")
}
func (UnimplementedTeamsServiceServer) GetAllTeams(context.Context, *AllTeamsRequest) (*AllTeamsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetAllTeams not implemented")
}
func (UnimplementedTeamsServiceServer) GetTwoTeamsOrdered(context.Context, *TwoTeamsRequest) (*TwoTeamsOrderedResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetTwoTeamsOrdered not implemented")
}
func (UnimplementedTeamsServiceServer) mustEmbedUnimplementedTeamsServiceServer() {}

// UnsafeTeamsServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to TeamsServiceServer will
// result in compilation errors.
type UnsafeTeamsServiceServer interface {
	mustEmbedUnimplementedTeamsServiceServer()
}

func RegisterTeamsServiceServer(s grpc.ServiceRegistrar, srv TeamsServiceServer) {
	s.RegisterService(&TeamsService_ServiceDesc, srv)
}

func _TeamsService_GetTwoTeams_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(TwoTeamsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TeamsServiceServer).GetTwoTeams(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: TeamsService_GetTwoTeams_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TeamsServiceServer).GetTwoTeams(ctx, req.(*TwoTeamsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _TeamsService_GetAllTeams_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(AllTeamsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TeamsServiceServer).GetAllTeams(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: TeamsService_GetAllTeams_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TeamsServiceServer).GetAllTeams(ctx, req.(*AllTeamsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _TeamsService_GetTwoTeamsOrdered_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(TwoTeamsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TeamsServiceServer).GetTwoTeamsOrdered(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: TeamsService_GetTwoTeamsOrdered_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TeamsServiceServer).GetTwoTeamsOrdered(ctx, req.(*TwoTeamsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// TeamsService_ServiceDesc is the grpc.ServiceDesc for TeamsService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var TeamsService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "teams.TeamsService",
	HandlerType: (*TeamsServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetTwoTeams",
			Handler:    _TeamsService_GetTwoTeams_Handler,
		},
		{
			MethodName: "GetAllTeams",
			Handler:    _TeamsService_GetAllTeams_Handler,
		},
		{
			MethodName: "GetTwoTeamsOrdered",
			Handler:    _TeamsService_GetTwoTeamsOrdered_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "teams.proto",
}